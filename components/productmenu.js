import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";

const ProductMenu = () => {
  return (
    <>
      <div className="bg-overlay" id="bgoverlay"></div>
      <div className="overlay-menu-cont " id="overlaymenucont">
        <div className="overlay-menu d-flex flex-wrap gap-3 " id="productmenu">
          <div className="menu mt-4 d-flex flex-column ">
            <p className="c-fs-3 c-fw-sb text-grey text-uppercase ">
              Applications
            </p>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/hello"
            >
              <Image
                src="/img/icon/hello.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <div className="">
                <h4 className="c-fs-2">Hello</h4>
                <p className="c-fs-5">Ticketing and Chat</p>
              </div>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/campaign"
            >
              <Image
                src="/img/icon/campaign.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <div className="">
                <h4 className="c-fs-2">Campaign</h4>
                <p className="c-fs-5">Event Based Automation</p>
              </div>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/segmento"
            >
              <Image
                src="/img/icon/segmento.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <div className="">
                <h4 className="c-fs-2">Segmento</h4>
                <p className="c-fs-5">Contact Managment</p>
              </div>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/otp"
            >
              <Image src="/img/icon/otp.svg" width={40} height={40} alt="ico" />
              <div className="">
                <h4 className="c-fs-2">OTP</h4>
                <p className="c-fs-5">Simplified OTP Platform</p>
              </div>
            </a>
          </div>
          <div className="menu mt-4 d-flex flex-column">
            <p className="c-fs-3 c-fw-sb text-grey text-uppercase ">
              Utilities
            </p>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/shorturl"
            >
              <Image
                src="/img/icon/shorturl.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <div className="">
                <h4 className="c-fs-2">Shorturl</h4>
                <p className="c-fs-5">Cutomise and Track URL's</p>
              </div>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/knowledgebase"
            >
              <Image
                src="/img/icon/knowledgebase.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <div className="">
                <h4 className="c-fs-2">KnowledgeBase</h4>
                <p className="c-fs-5">Manage Help Docs and Guides</p>
              </div>
            </a>
          </div>
          <div className="menu mt-4 d-flex flex-column ">
            <p className="c-fs-3 c-fw-sb text-grey text-uppercase ">Channels</p>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/sms"
            >
              <Image src="/img/icon/sms.svg" width={40} height={40} alt="ico" />
              <h4 className="c-fs-2">SMS</h4>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/email"
            >
              <Image
                src="/img/icon/email.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <h4 className="c-fs-2">Email</h4>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/voice"
            >
              <Image
                src="/img/icon/voice.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <h4 className="c-fs-2">Voice</h4>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/whatsapp"
            >
              <Image
                src="/img/icon/whatsapp.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <h4 className="c-fs-2">WhatsApp</h4>
            </a>
          </div>
        </div>
        <div className="overlay-menu d-flex flex-wrap gap-3" id="integrationsmenu">
        <div className="menu mt-4 d-flex flex-column ">
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/Shopify"
            >
              <Image
                src="/img/integrations/shopify.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <h4 className="c-fs-2">Shopify</h4>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/zapier"
            >
              <Image
                src="/img/integrations/zapier.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <h4 className="c-fs-2">Zapier</h4>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/hubspot"
            >
              <Image
                src="/img/integrations/hubspot.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <h4 className="c-fs-2">Hubspot</h4>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/freshworks"
            >
              <Image
                src="/img/integrations/freshworks.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <h4 className="c-fs-2">Freshworks</h4>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/google-sheets"
            >
              <Image
                src="/img/integrations/google-sheets.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <h4 className="c-fs-2">Google Sheets</h4>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/zoho"
            >
              <Image
                src="/img/integrations/zoho.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <h4 className="c-fs-2">Zoho</h4>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href="/clevertap"
            >
              <Image
                src="/img/integrations/clevertap.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <h4 className="c-fs-2">Clevertap</h4>
            </a>
            <a
              className="d-flex gap-3 align-items-center btn   c-fs-3 c-fw-sb"
              href="/partners-and-integrations"
            >
              <span>Explore More Plugins</span>
              <MdKeyboardArrowRight/>

            </a>
            
          </div>

        </div>
      </div>
    </>
  );
};
export default ProductMenu;