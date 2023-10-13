import React from 'react';
import { MdDone } from 'react-icons/md';
import StepOne from '@/components/signup/stepOne';
import StepTwo from '@/components/signup/stepTwo';
import StepThree from '@/components/signup/stepThree';
import { getCookie, getQueryParamsDeatils, setCookie } from '@/components/utils';
import { toast } from 'react-toastify';
import { MdCheckCircle } from 'react-icons/md';

const OTPRetryModes = {
    Sms: '11',
    Voice: '4',
    Email: '3',
    Whatsapp: '12',
};
const MOBILE_REGEX = /^[+]?[0-9]+$/;
const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.sendOtp = this.sendOtp.bind(this);
        this.retryOtp = this.retryOtp.bind(this);
        this.verifyOtp = this.verifyOtp.bind(this);

        let queryParams = getQueryParamsDeatils(this.props?.browserPathCase);

        this.state = {
            activeStep: queryParams?.['code'] ? 2 : 1,
            signupByGitHub: queryParams?.['githubsignup'] ? true : false,
            githubCode: queryParams?.['code'],
            githubState: queryParams?.['state'],
            widgetData: null,
            allowedRetry: null,
            emailAccessToken: null,
            smsAccessToken: null,
            preselectedService: null,
        };
    }

    componentDidMount = () => {
        this.otpWidgetSetup();
        const queryParams = getQueryParamsDeatils(this.props?.browserPathCase);
        if (queryParams?.service) {
            this.setState({ preselectedService: queryParams.service });
        }
    };

    setStep = (step) => {
        this.setState({
            activeStep: step,
        });
    };

    otpWidgetSetup = () => {
        const head = document.getElementsByTagName('head')[0];
        const currentTimestamp = new Date().getTime();
        const otpWidgetScript = document.createElement('script');
        otpWidgetScript.type = 'text/javascript';
        otpWidgetScript.src = `${process.env.WIDGET_SCRIPT}?v=${currentTimestamp}`;
        otpWidgetScript.onload = () => {
            const configuration = {
                widgetId: process.env.OTP_WIDGET_TOKEN,
                tokenAuth: process.env.WIDGET_AUTH_TOKEN,
                success: (data) => {},
                failure: (error) => {},
                exposeMethods: true,
            };
            window.initSendOTP(configuration);
            const widgetDataInterval = setInterval(() => {
                let widgetData = window.getWidgetData();
                if (widgetData) {
                    this.setState({
                        widgetData: window.getWidgetData(),
                        allowedRetry: {
                            email: widgetData?.processes?.find(
                                (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Email
                            ),
                            whatsApp: widgetData?.processes?.find(
                                (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Whatsapp
                            ),
                            voice: widgetData?.processes?.find(
                                (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Voice
                            ),
                            sms: widgetData?.processes?.find(
                                (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Sms
                            ),
                        },
                    });
                    clearInterval(widgetDataInterval);
                }
            }, 1000);
        };
        head.appendChild(otpWidgetScript);
    };

    identifierChange = (notByEmail) => {
        if (notByEmail) {
            this.setState({ smsIdentifier: null, smsAccessToken: null });
            return;
        }
        if (!notByEmail) {
            this.setState({ emailIdentifier: null, emailAccessToken: null });
            return;
        }
    };

    sendOtp = (identifier, notByEmail) => {
        if (!new RegExp(EMAIL_REGEX).test(identifier) && !notByEmail) {
            toast.error('Invalid email address.');
            return;
        }
        if (!new RegExp(MOBILE_REGEX).test(identifier) && notByEmail) {
            toast.error('Invalid mobile number.');
            return;
        }
        window.sendOtp(
            identifier,
            (data) => {
                if (notByEmail) {
                    this.setState({
                        smsRequestId: data?.message,
                        smsIdentifier: identifier,
                        smsSuccessMessage: 'OTP sent successfully.',
                    });
                } else {
                    this.setState({
                        emailRequestId: data?.message,
                        emailIdentifier: identifier,
                        emailSuccessMessage: 'OTP sent successfully.',
                    });
                }
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    };

    retryOtp(retryBy, requestId, notByEmail) {
        window.retryOtp(
            retryBy,
            (data) => {
                if (notByEmail) {
                    this.setState({ smsSuccessMessage: 'OTP resent successfully.' });
                } else {
                    this.setState({ emailSuccessMessage: 'OTP resent successfully.' });
                }
            },
            (error) => {
                toast.error(error?.message);
            },
            requestId
        );
    }

    verifyOtp = (otp, requestId, notByEmail) => {
        window.verifyOtp(
            `${otp}`,
            (data) => {
                if (!notByEmail) {
                    this.setState({
                        emailAccessToken: data.message,
                        emailSuccessMessage: 'Email verified.',
                    });
                } else {
                    this.setState({
                        smsAccessToken: data.message,
                        smsSuccessMessage: 'Mobile verified.',
                    });
                }
            },
            (error) => {
                toast.error(error?.message);
            },
            requestId
        );
    };

    validateUserForCompany = () => {
        if (!this.state.smsAccessToken || !this.state.emailAccessToken) {
            toast.error('Email and Mobile should be verified.');
            return;
        }
        let url = process.env.API_BASE_URL + '/api/v5/nexus/validateEmailSignUp';
        const utmObj = Object.fromEntries(
            getCookie('msg91_query')
                ?.replace('?', '')
                ?.split('&')
                ?.map((v) => v.split('=')) ?? []
        );
        const payload = {
            'session': getCookie('sessionId'),
            'mobileToken': this.state.smsAccessToken,
            ...utmObj,
            // "utm_term": "utm_term",
            // "utm_medium": "utm_medium",
            // "utm_source": "utm_source",
            // "utm_campaign": "utm_campaign",
            // "utm_content": "utm_content",
            // "utm_matchtype": "utm_matchtype",
            // "ad": "ad",
            // "adposition": "adposition",
            // "reference": "reference",
            // "source": "msg91"
        };
        if (this.state.githubCode && this.state.signupByGitHub) {
            payload['code'] = this.state.githubCode;
            payload['state'] = this.state.githubState;
            url = process.env.API_BASE_URL + '/api/v5/nexus/validateGithubSignUp';
        } else {
            payload['emailToken'] = this.state.emailAccessToken;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        };
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                this.setSession(result);
                this.setState({ sessionDetails: result?.data?.sessionDetails });
                if (!result?.hasError) {
                    if (result?.data?.data?.nextStep === 'createNewCompany') {
                        this.setStep(3);
                    } else if (result?.data?.data?.nextStep === 'loginIntoExistingAccount') {
                        location.href = process.env.SUCCESS_REDIRECTION_URL?.replace(
                            ':session',
                            result?.data?.sessionDetails?.PHPSESSID
                        );
                    } else if (result?.data?.data?.nextStep === 'hasInvitations') {
                        this.setState({ invitations: result?.data?.data?.invitations });
                        this.setStep(3);
                    }
                } else {
                    toast.error(result?.errors?.[0] ?? result?.errors);
                }
            });
    };

    setSession = (result) => {
        const sessionId = result?.data?.sessionDetails?.PHPSESSID;
        if (sessionId) {
            setCookie('sessionId', sessionId, 30);
        }
    };

    finalSubmit = (data, createCompany) => {
        const url = process.env.API_BASE_URL + '/api/v5/nexus/finalRegister';
        const payload = {
            'companyDetails': createCompany
                ? {
                      'industry': data?.industryType,
                      'state': data?.stateName,
                      'cityId': data?.cityId,
                      'customCity': data?.otherCity,
                      'country': data?.countryName,
                      'city': data?.city,
                      'zipcode': data?.pincode,
                      'address': data?.address,
                      'gstNo': data?.gstNumber,
                      'countryId': data?.country,
                      'stateId': data?.stateProvince,
                      'companyName': data?.companyName,
                      'service': data?.serviceNeeded,
                  }
                : {},
            'userDetails': {
                'firstName': data?.firstName,
                'lastName': data?.lastName,
            },
            'acceptInviteForCompanies': data.acceptInviteForCompanies,
            'session': getCookie('sessionId'),
        };

        console.log(payload);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        };
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                this.setSession(result);
                if (!result?.hasError) {
                    this.setStep(4);
                    setTimeout(() => {
                        location.href = process.env.SUCCESS_REDIRECTION_URL?.replace(
                            ':session',
                            getCookie('sessionId')
                        );
                    }, 10);
                } else {
                    toast.error(result?.errors?.[0] ?? result?.errors);
                }
            });
    };

    render() {
        return (
            <>
                <section className="signup d-flex flex-column flex-md-row-reverse ">
                    <div className="signup__right d-flex gap-4 flex-column ">
                        <img src="/images/msgOriginalsvg.png" className="signup__right__logo d-block d-md-none" />
                        <h1 className="signup__right__heading c-fs-2 heading d-block d-md-none">
                            Signup to avail a complete suite of MSG91 products
                        </h1>
                        {this.state.activeStep === 4 ? (
                            <h1 className="signup__right__heading c-fs-2 heading text-green">
                                Account created Successfully!
                            </h1>
                        ) : (
                            <h1 className="signup__right__heading c-fs-2 heading ">Create an account</h1>
                        )}

                        <div className="signup__right__main">
                            {/* STEP #1 */}
                            {this.state.activeStep === 1 && (
                                <StepOne signupByGitHubAccount={this.signupByGitHubAccount} setStep={this.setStep} />
                            )}

                            {/* STEP #2 */}
                            {this.state.activeStep === 2 && (
                                <StepTwo
                                    sendOtp={this.sendOtp}
                                    setStep={this.setStep}
                                    verifyOtp={this.verifyOtp}
                                    widgetData={this.state.widgetData}
                                    allowedRetry={this.state.allowedRetry}
                                    retryOtp={this.retryOtp}
                                    validateUserForCompany={this.validateUserForCompany}
                                    identifierChange={this.identifierChange}
                                    OTPRetryModes={OTPRetryModes}
                                    smsRequestId={this.state?.smsRequestId}
                                    emailRequestId={this.state?.emailRequestId}
                                    smsIdentifier={this.state?.smsIdentifier}
                                    emailIdentifier={this.state?.emailIdentifier}
                                    smsSuccessMessage={this.state?.smsSuccessMessage}
                                    emailSuccessMessage={this.state?.emailSuccessMessage}
                                    smsAccessToken={this.state?.smsAccessToken}
                                    emailAccessToken={this.state?.emailAccessToken}
                                    signupByGitHub={this.state?.signupByGitHub}
                                />
                            )}

                            {/* STEP #3 */}
                            {this.state.activeStep === 3 && (
                                <StepThree
                                    invitations={this.state.invitations}
                                    preselectedService={this.state.preselectedService}
                                    setStep={this.setStep}
                                    finalSubmit={this.finalSubmit}
                                />
                            )}
                            {this.state.activeStep === 4 && (
                                <div className="trep-three d-flex flex-column gap-3">
                                    <div className="step-three__progress d-flex align-items-center gap-3 ">
                                        <div className="text-green align-items-center gap-1 c-fs-5 d-none d-lg-flex">
                                            <MdCheckCircle className="ico-green" /> Verify email & mobile number
                                        </div>
                                        <span className="progress-line line-green d-none d-lg-block "></span>
                                        <div className="text-green d-flex align-items-center gap-1 c-fs-5 ">
                                            <MdCheckCircle className="ico-green" />
                                            Enter details
                                        </div>
                                    </div>
                                    <p className="step-three__reddirect">Redirecting...</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="signup__left  d-flex gap-4 flex-column">
                        <img src="/images/msgOriginalsvg.png" className="signup__left__logo d-none d-md-block" />
                        <h1 className="signup__left__heading c-fs-2 heading d-none d-md-block">
                            Signup to avail a complete suite of MSG91 products
                        </h1>
                        <p className="signup__left__que c-fs-3 c-fw-m">What can you build with MSG91?</p>
                        <div className="signup__left__features d-grid gap-2">
                            <ul className="list-unstyled d-grid gap-3 c-fs-4">
                                <li className="d-flex align-items-center gap-2 c-fs-4">
                                    <MdDone className="ico-green" />
                                    Programmable SMS
                                </li>
                                <li className="d-flex align-items-center gap-2 c-fs-4">
                                    <MdDone className="ico-green" />
                                    Customer Contact Center
                                </li>
                                <li className="d-flex align-items-center gap-2 c-fs-4">
                                    <MdDone className="ico-green" />
                                    Virtual Number
                                </li>
                                <li className="d-flex align-items-center gap-2 c-fs-4">
                                    <MdDone className="ico-green" />
                                    Automated user segmentation
                                </li>
                                <li className="d-flex align-items-center gap-2 c-fs-4">
                                    <MdDone className="ico-green" />
                                    OTP invisible verification
                                </li>
                            </ul>
                        </div>
                        <p className="signup__left__que c-fs-3 c-fw-m">Trusted by 30000+ startups and enterprises</p>
                    </div>
                </section>
            </>
        );
    }
}

export default SignUp;
