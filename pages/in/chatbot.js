import GetStartedSection from '@/components/getStartedSection/getStartedSection';
import { MdCheck, MdDoneAll, MdSend } from 'react-icons/md';

export default function Chatbot() {
    return (
        <>
            <div className="container py-5 d-flex gap-5 ">
                <div className="d-flex flex-column gap-4">
                    <p className="text-uppercase  c-ls-20 mt-3 hello-dark">AI CHATBOT</p>
                    <h1 className="heading w-md-75 w-100 mx-auto mb-2 c-fw-xb">
                        Experience AI Chatbots in Action, Start Chatting Now!
                    </h1>
                    <h2 className="c-fs-2 w-md-75 w-100 mx-auto fw-normal">
                        Integrate AI-powered chatbot with WhatsApp, Chatbot, Facebook Messenger and more channels
                    </h2>

                    <div className="d-grid grid-cols-2 chatbot_card-cont">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className={`d-flex flex-column gap-1 chatbot_card p-4 ${index == 0 ? 'active' : ''}`}
                            >
                                <h3 className="c-fs-3 c-fw-sb">Order Pizza</h3>
                                <p>
                                    This bot will help you order pizza, track your delivery and provide support related
                                    to that.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatbotwrapper">
                    <div className="chats_cont">
                        <div className="chats">
                            <Day />
                            <InputMessage />
                            <InTime />
                            <OutMessage />
                            <OutTime />

                        </div>
                    </div>
                    <div className="botinputfield">
                        <input type="text" class="form-control" placeholder="Send us a message" />
                        <button className="botinputfield__send btn btn-dark-outline">
                            <MdSend fontSize={18} />
                        </button>
                    </div>
                </div>
            </div>
            <GetStartedSection />
        </>
    );
}

function InputMessage() {
    return (
        <>
            <div className="botinput">
                <p className="botinput__bot">Bot</p>
                <p className="botinput__msg">Hello there, How can I help you?</p>
            </div>
        </>
    );
}
function OutMessage() {
    return (
        <>
            <div className="botout">
                <p className="botout__msg">Hello there, How can I help you?</p>
            </div>
        </>
    );
}
function InTime() {
    return (
        <>
            <div className="bottime in">
                <p className="bottime__time">13:43</p>
            </div>
        </>
    );
}
function OutTime(type) {
    return (
        <>
            <div className="bottime out">
                <p className="bottime__time">13:43</p>
                <MdDoneAll color="#1E75BA" />
            </div>
        </>
    );
}
function Day(type) {
    return (
        <>
            <div className="botday">Monday</div>
        </>
    );
}
