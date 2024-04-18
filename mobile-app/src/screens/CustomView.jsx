import React from 'react';
import {
    View,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import BottomTab from '../navigation/BottomTab';

const CustomView = ({ route }) => {
    const screen = route.name;
    const aboutUsHTML = `<!DOCTYPE html5>
  <head>
      <style>
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {}

          .sec-title {
              position: relative;
              z-index: 1;
              margin: 60px 0;
          }
  
          .sec-title .title {
              position: relative;
              display: block;
              font-size: 55px;
              line-height: 24px;
              color: #0943A3;
              font-weight: 900;
              margin-bottom: 15px;
          }
  
          .sec-title h2 {
              position: relative;
              display: block;
              font-size: 50px;
              line-height: 1.28em;
              color: #222222;
              font-weight: 500;
              padding-bottom: 18px;
          }
  
          .sec-title h2:before {
              position: absolute;
              content: '';
              left: 0px;
              bottom: 0px;
              width: 50px;
              height: 3px;
              background-color: #d1d2d6;
          }
  
          .sec-title .text {
              position: relative;
              font-size: 60px;
              line-height: 26px;
              color: #848484;
              font-weight: 400;
              margin-top: 35px;
          }
  
          .sec-title.light h2 {
              color: #ffffff;
          }
  
          .sec-title.text-center h2:before {
              left: 50%;
              margin-left: -25px;
          }

          .about-section {
              position: relative;
         
          }
  
          .about-section .sec-title {
              margin-bottom: 45px;
          }
  
          .about-section .content-column {
              position: relative;
              margin-bottom: 50px;
          }
  
          .about-section .content-column .inner-column {
              position: relative;
              padding-left: 30px;
          }
  
          .about-section .text {
              margin-bottom: 20px;
              font-size: 36px;
              line-height: 36px;
              color: #848484;
              font-weight: 400;
          }
  
          .about-section .btn-box {
              position: relative;
          }
  
          .about-section .btn-box a {
              padding: 15px 50px;
          }
  
          .about-section .image-column {
              position: relative;
          }
  
          .about-section .image-column .text-layer {
              position: absolute;
              right: -110px;
              top: 50%;
              font-size: 325px;
              line-height: 1em;
              color: #ffffff;
              margin-top: -175px;
              font-weight: 500;
          }
  
          .about-section .image-column .inner-column {
              position: relative;
              padding-left: 80px;
              padding-bottom: 0px;
          }
  
          .about-section .image-column .inner-column .author-desc {
              position: absolute;
              bottom: 16px;
              z-index: 1;
              background: orange;
              padding: 10px 15px;
              left: 96px;
              width: calc(100% - 152px);
              border-radius: 50px;
          }
  
          .about-section .image-column .inner-column .author-desc h2 {
              font-size: 21px;
              letter-spacing: 1px;
              text-align: center;
              color: #fff;
              margin: 0;
          }
  
          .about-section .image-column .inner-column .author-desc span {
              font-size: 16px;
              letter-spacing: 6px;
              text-align: center;
              color: #fff;
              display: block;
              font-weight: 400;
          }
  
          .about-section .image-column .inner-column:before {
              content: '';
              position: absolute;
              width: calc(50% + 80px);
              height: calc(100% + 160px);
              top: -80px;
              left: -3px;
              background: transparent;
              z-index: 0;
              border: 44px solid #00aeef;
          }
  
          .about-section .image-column .image-1 {
              position: relative;
          }
  
          .about-section .image-column .image-2 {
              position: absolute;
              left: 0;
              bottom: 0;
          }
  
          .about-section .image-column .image-2 img,
          .about-section .image-column .image-1 img {
              box-shadow: 0 30px 50px rgba(8, 13, 62, .15);
              border-radius: 46px;
          }
  
          .about-section .image-column .video-link {
              position: absolute;
              left: 70px;
              top: 170px;
          }


          img {
            vertical-align: middle;
            width: 100%;
            height: auto;
        }
  
          .about-section .image-column .video-link .link {
              position: relative;
              display: block;
              font-size: 22px;
              color: #191e34;
              font-weight: 400;
              text-align: center;
              height: 100px;
              width: 100px;
              line-height: 100px;
              background-color: #ffffff;
              border-radius: 50%;
              box-shadow: 0 30px 50px rgba(8, 13, 62, .15);
              -webkit-transition: all 300ms ease;
              -moz-transition: all 300ms ease;
              -ms-transition: all 300ms ease;
              -o-transition: all 300ms ease;
              transition: all 300ms ease;
          }
      </style>
  </head>
  <body>
      <section class="about-section">
          <div class="container">
              <div class="row">
                  <div class="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                  <img src="https://www.livemint.com/lm-img/img/2023/08/17/1600x900/Screenshot_2023-02-16_132652_1676534468247_1692295780244.png" alt="" >
                      <div class="inner-column">
                          <div class="sec-title">
                              <span class="title">WHY CHOOSE US</span>
                              <h2>Our Mission !</h2>
                          </div>
                          <div class="text">Our mission is to provide outstanding service and superior coverage to every one of our clients.!</div>
                          <div class="sec-title">
                           
                              <h2>24/7 Support !</h2>
                          </div>
                          <div class="text">Our dedicated support professionals are always here to help no matter your issue.</div>
                          <div class="sec-title">
                           
                              <h2>
                              Our Commitment !</h2>
                          </div>
                          <div class="text">We are proud to offer our clients competitive pricing, a broad choice of products and unparalleled advocacy.</div>
                        
                         
                      </div>
                
                     
                  </div>
                
                      </div>
                  </div>
  
              </div>
            
          </div>
      </section>
  </body>
  
  </html>`;
    const termsConditionHTML = `<!DOCTYPE html5>
  <head>
      <style>
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {}
          .sec-title {
              position: relative;
              z-index: 1;
              margin: 60px 0;
          }
  
          .sec-title .title {
              position: relative;
              display: block;
              font-size: 50px;
              line-height: 24px;
              color: #0943A3;
              font-weight: 500;
              margin-bottom: 15px;
          }
  
          .sec-title h2 {
              position: relative;
              display: block;
              font-size: 55px;
              line-height: 1.28em;
              color: #222222;
              font-weight: 600;
              padding-bottom: 18px;
          }
  
          .sec-title h2:before {
              position: absolute;
              content: '';
              left: 0px;
              bottom: 0px;
              width: 50px;
              height: 3px;
              background-color: #d1d2d6;
          }
  
          .sec-title .text {
              position: relative;
              font-size: 60px;
              line-height: 26px;
              color: #848484;
              font-weight: 400;
              margin-top: 35px;
              text-align: justify;
          }
  
          .sec-title.light h2 {
              color: #ffffff;
          }
  
          .sec-title.text-center h2:before {
              left: 50%;
              margin-left: -25px;
          }
  
          .about-section {
              position: relative;
  
          }
  
          .about-section .sec-title {
              margin-bottom: 45px;
          }
  
          .about-section .content-column {
              position: relative;
              margin-bottom: 50px;
          }
  
          .about-section .content-column .inner-column {
              position: relative;
              padding-left: 30px;
          }
  
          .about-section .text {
              margin-bottom: 20px;
              font-size: 36px;
              line-height: 36px;
              color: #848484;
              font-weight: 400;
          }
  
          .about-section .btn-box {
              position: relative;
          }
  
          .about-section .btn-box a {
              padding: 15px 50px;
          }
  
          .about-section .image-column {
              position: relative;
          }
  
          .about-section .image-column .text-layer {
              position: absolute;
              right: -110px;
              top: 50%;
              font-size: 325px;
              line-height: 1em;
              color: #ffffff;
              margin-top: -175px;
              font-weight: 500;
          }
  
          .about-section .image-column .inner-column {
              position: relative;
              padding-left: 80px;
              padding-bottom: 0px;
          }
  
          .about-section .image-column .inner-column .author-desc {
              position: absolute;
              bottom: 16px;
              z-index: 1;
              background: orange;
              padding: 10px 15px;
              left: 96px;
              width: calc(100% - 152px);
              border-radius: 50px;
          }
  
          .about-section .image-column .inner-column .author-desc h2 {
              font-size: 21px;
              letter-spacing: 1px;
              text-align: center;
              color: #fff;
              margin: 0;
          }
  
          .about-section .image-column .inner-column .author-desc span {
              font-size: 16px;
              letter-spacing: 6px;
              text-align: center;
              color: #fff;
              display: block;
              font-weight: 400;
          }
  
          .about-section .image-column .inner-column:before {
              content: '';
              position: absolute;
              width: calc(50% + 80px);
              height: calc(100% + 160px);
              top: -80px;
              left: -3px;
              background: transparent;
              z-index: 0;
              border: 44px solid #00aeef;
          }
  
          .about-section .image-column .image-1 {
              position: relative;
          }
  
          .about-section .image-column .image-2 {
              position: absolute;
              left: 0;
              bottom: 0;
          }
  
          .about-section .image-column .image-2 img,
          .about-section .image-column .image-1 img {
              box-shadow: 0 30px 50px rgba(8, 13, 62, .15);
              border-radius: 46px;
          }
  
          .about-section .image-column .video-link {
              position: absolute;
              left: 70px;
              top: 170px;
          }
  
          .about-section .image-column .video-link .link {
              position: relative;
              display: block;
              font-size: 22px;
              color: #191e34;
              font-weight: 400;
              text-align: center;
              height: 100px;
              width: 100px;
              line-height: 100px;
              background-color: #ffffff;
              border-radius: 50%;
              box-shadow: 0 30px 50px rgba(8, 13, 62, .15);
              -webkit-transition: all 300ms ease;
              -moz-transition: all 300ms ease;
              -ms-transition: all 300ms ease;
              -o-transition: all 300ms ease;
              transition: all 300ms ease;
          }
      </style>
  </head>
  <body>
      <section class="about-section">
          <div class="container">
              <div class="row">
                  <div class="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                      <div class="inner-column">
                          <div class="sec-title">
                              <span class="title">Our Terms & Condtions</span>
                          </div>
                          <div class="text">These terms and conditions outline the rules and regulations for the use of
                              our company.</div>
                          <div class="text">By accessing this website we assume you accept these terms and conditions. Do
                              not continue to use our website if you do not agree to take all of the terms and conditions
                              stated on this page.</div>
                          <div class="text">The following terminology applies to these Terms and Conditions, Privacy
                              Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to
                              you, the person log on this website and compliant to the Company's terms and conditions.
                              “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”,
                              or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance
                              and consideration of payment necessary to undertake the process of our assistance to the
                              Client in the most appropriate manner for the express purpose of meeting the Client's needs
                              in respect of provision of the Company's stated services, in accordance with and subject to,
                              prevailing law of Netherlands. Any use of the above terminology or other words in the
                              singular, plural, capitalization and/or he/she or they, are taken as interchangeable and
                              therefore as referring to same.</div>
                          <div class="sec-title">
                              <span class="title">Cookies</span>
                          </div>
                          <div class="text">We employ the use of cookies. By accessing our website, you agreed to use
                              cookies in agreement with our company's Privacy Policy.</div>
                          <div class="text">Most interactive websites use cookies to let us retrieve the user's details
                              for each visit. Cookies are used by our website to enable the functionality of certain areas
                              to make it easier for people visiting our website. Some of our affiliate/advertising
                              partners may also use cookies.</div>
                          <div class="sec-title">
                              <span class="title">License</span>
                          </div>
                          <div class="text">Unless otherwise stated, LOPYI and its licensors own the intellectual property
                              rights for all material on our website. All intellectual property rights are reserved. You
                              may access this from our website for your own personal use subjected to restrictions set in
                              these terms and conditions.</div>
                          <div class="text">You must not:
                              <ul>
                                  <li>Republish material from our website</li>
                                  <li>Sell, rent or sub-license material from our website</li>
                                  <li>Reproduce, duplicate or copy material from our website</li>
                                  <li>Redistribute content from our website</li>
                              </ul>
                          </div>
                          <div class="text">This Agreement shall begin on the date hereof.</div>
                          <div class="text">Parts of this website offer an opportunity for users to post and exchange
                              opinions and information in certain areas of the website. LOPYI does not filter, edit,
                              publish or review Comments prior to their presence on the website. Comments do not reflect
                              the views and opinions of LOPYI,its agents and/or affiliates. Comments reflect the views and
                              opinions of the person who post their views and opinions. To the extent permitted by
                              applicable laws, LOPYI shall not be liable for the Comments or for any liability, damages or
                              expenses caused and/or suffered as a result of any use of and/or posting of and/or
                              appearance of the Comments on this website.</div>
                          <div class="text">LOPYI reserves the right to monitor all Comments and to remove any Comments
                              which can be considered inappropriate, offensive or causes breach of these Terms and
                              Conditions.</div>
                          <div class="text">You warrant and represent that:
                              <ul>
                                  <li>You are entitled to post the Comments on our website and have all necessary licenses
                                      and consents to do so;</li>
                                  <li>The Comments do not invade any intellectual property right, including without
                                      limitation copyright, patent or trademark of any third party;</li>
                                  <li>The Comments do not contain any defamatory, libelous, offensive, indecent or
                                      otherwise unlawful material which is an invasion of privacy</li>
                                  <li>The Comments will not be used to solicit or promote business or custom or present
                                      commercial activities or unlawful activity.</li>
                              </ul>
                          </div>
                          <div class="text">You hereby grant LOPYI a non-exclusive license to use, reproduce, edit and
                              authorize others to use, reproduce and edit any of your Comments in any and all forms,
                              formats or media.</div>
                          <div class="sec-title">
                              <span class="title">Hyperlinking to our Content</span>
                          </div>
                          <div class="text">The following organizations may link to our website without prior written
                              approval:
                              <ul>
                                  <li>Government agencies;</li>
                                  <li>Search engines;</li>
                                  <li>News organizations;</li>
                                  <li>
                                      Online directory distributors may link to our website in the same manner
                                      as they hyperlink to the websites of other listed businesses; and
                                  </li>
                                  <li>
                                      System wide Accredited Businesses except soliciting non-profit
                                      organizations, charity shopping malls, and charity fundraising groups
                                      which may not hyperlink to our Web site.
                                  </li>
                              </ul>
                          </div>
                          <div class="text">These organizations may link to our home page, to publications or to other
                              website information so long as the link: (a) is not in any way deceptive; (b) does not
                              falsely imply sponsorship, endorsement or approval of the linking party and its products
                              and/or services; and (c) fits within the context of the linking party's site.</div>
                          <div class="text">We may consider and approve other link requests from the following types of
                              organizations:
                              <ul>
                                  <li>commonly-known consumer and/or business information sources;</li>
                                  <li>dot.com community sites;</li>
                                  <li>associations or other groups representing charities;</li>
                                  <li>online directory distributors;</li>
                                  <li>internet portals;</li>
                                  <li>accounting, law and consulting firms; and</li>
                                  <li>educational institutions and trade associations.</li>
                              </ul>
                          </div>
                          <div class="text">We will approve link requests from these organizations if we decide that: (a)
                              the link would not make us look unfavorably to ourselves or to our accredited businesses;
                              (b) the organization does not have any negative records with us; (c) the benefit to us from
                              the visibility of the hyperlink compensates the absence of LOPYI; and (d) the link is in the
                              context of general resource information.</div>
                          <div class="text">These organizations may link to our home page so long as the link: (a) is not
                              in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the
                              linking party and its products or services; and (c) fits within the context of the linking
                              party's site.</div>
                          <div class="text">If you are one of the organizations listed in paragraph 2 above and are
                              interested in linking to our website, you must inform us by sending an e-mail to our
                              company. Please include your name, your organization name, contact information as well as
                              the URL of your site, a list of any URLs from which you intend to link to our website, and a
                              list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
                          </div>
                          <div class="text">Approved organizations may hyperlink to our website as follows:
                              <ul>
                                  <li>By use of our corporate name; or</li>
                                  <li>By use of the uniform resource locator being linked to; or</li>
                                  <li>
                                      By use of any other description of our website being linked to that makes
                                      sense within the context and format of content on the linking party's
                                      site.
                                  </li>
                                  <li>
                                      No use of our company's logo or other artwork will be allowed for linking
                                      absent a trademark license agreement.
                                  </li>
                              </ul>
                          </div>
                          <div class="sec-title">
                              <span class="title">iFrames</span>
                          </div>
                          <div class="text">Without prior approval and written permission, you may not create frames
                              around our Webpages that alter in any way the visual presentation or appearance of our
                              website.
                          </div>
                          <div class="sec-title">
                              <span class="title">Content Liability</span>
                          </div>
                          <div class="text">We shall not be hold responsible for any content that appears on your website.
                              You agree to protect and defend us against all claims that is rising on your website. No
                              link(s) should appear on any website that may be interpreted as libelous, obscene or
                              criminal, or which infringes, otherwise violates, or advocates the infringement or other
                              violation of, any third party rights.
                          </div>
                          <div class="sec-title">
                              <span class="title">Reservation of Rights</span>
                          </div>
                          <div class="text">We reserve the right to request that you remove all links or any particular
                              link to our website. You approve to immediately remove all links to our website upon
                              request. We also reserve the right to amen these terms and conditions and it's linking
                              policy at any time. By continuously linking to our website, you agree to be bound to and
                              follow these linking terms and conditions.
                          </div>
                          <div class="sec-title">
                              <span class="title">Removal of links from our website</span>
                          </div>
                          <div class="text">If you find any link on our website that is offensive for any reason, you are
                              free to contact and inform us any moment. We will consider requests to remove links but we
                              are not obligated to or so or to respond to you directly.
                          </div>
                          <div class="text">We do not ensure that the information on this website is correct, we do not
                              warrant its completeness or accuracy; nor do we promise to ensure that the website remains
                              available or that the material on the website is kept up to date.
                          </div>
                          <div class="sec-title">
                              <span class="title">Disclaimer</span>
                          </div>
                          <div class="text">To the maximum extent permitted by applicable law, we exclude all
                              representations, warranties and conditions relating to our website and the use of this
                              website. Nothing in this disclaimer will:
                              <ul>
                                  <li>
                                      limit or exclude our or your liability for death or personal injury;
                                  </li>
                                  <li>
                                      limit or exclude our or your liability for fraud or fraudulent
                                      misrepresentation;
                                  </li>
                                  <li>
                                      limit any of our or your liabilities in any way that is not permitted
                                      under applicable law; or
                                  </li>
                                  <li>
                                      exclude any of our or your liabilities that may not be excluded under
                                      applicable law.
                                  </li>
                              </ul>
                          </div>
                          <div class="text">The limitations and prohibitions of liability set in this Section and
                              elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all
                              liabilities arising under the disclaimer, including liabilities arising in contract, in tort
                              and for breach of statutory duty.
                          </div>
                          <div class="text">As long as the website and the information and services on the website are
                              provided free of charge, we will not be liable for any loss or damage of any nature.
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  </body>
  </html>`;
    const privacyPolicyHTML = `<!DOCTYPE html5>
  <head>
      <style>
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {}
  
    
  
          .sec-title {
              position: relative;
              z-index: 1;
              margin: 60px 0;
          }
  
          .sec-title .title {
              position: relative;
              display: block;
              font-size: 50px;
              line-height: 24px;
              color: #0943A3;
              font-weight: 500;
              margin-bottom: 15px;
          }
  
          .sec-title h2 {
              position: relative;
              display: block;
              font-size: 55px;
              line-height: 1.28em;
              color: #222222;
              font-weight: 600;
              padding-bottom: 18px;
          }
  
          .sec-title h2:before {
              position: absolute;
              content: '';
              left: 0px;
              bottom: 0px;
              width: 50px;
              height: 3px;
              background-color: #d1d2d6;
          }
  
          .sec-title .text {
              position: relative;
              font-size: 60px;
              line-height: 26px;
              color: #848484;
              font-weight: 400;
              margin-top: 35px;
              text-align: justify;
          }
  
          .sec-title.light h2 {
              color: #ffffff;
          }
  
          .sec-title.text-center h2:before {
              left: 50%;
              margin-left: -25px;
          }
  
          .about-section {
              position: relative;
  
          }
  
          .about-section .sec-title {
              margin-bottom: 45px;
          }
  
          .about-section .content-column {
              position: relative;
              margin-bottom: 50px;
          }
  
          .about-section .content-column .inner-column {
              position: relative;
              padding-left: 30px;
          }
  
          .about-section .text {
              margin-bottom: 20px;
              font-size: 36px;
              line-height: 36px;
              color: #848484;
              font-weight: 400;
          }
  
          .about-section .btn-box {
              position: relative;
          }
  
          .about-section .btn-box a {
              padding: 15px 50px;
          }
  
          .about-section .image-column {
              position: relative;
          }
  
          .about-section .image-column .text-layer {
              position: absolute;
              right: -110px;
              top: 50%;
              font-size: 325px;
              line-height: 1em;
              color: #ffffff;
              margin-top: -175px;
              font-weight: 500;
          }
  
          .about-section .image-column .inner-column {
              position: relative;
              padding-left: 80px;
              padding-bottom: 0px;
          }
  
          .about-section .image-column .inner-column .author-desc {
              position: absolute;
              bottom: 16px;
              z-index: 1;
              background: orange;
              padding: 10px 15px;
              left: 96px;
              width: calc(100% - 152px);
              border-radius: 50px;
          }
  
          .about-section .image-column .inner-column .author-desc h2 {
              font-size: 21px;
              letter-spacing: 1px;
              text-align: center;
              color: #fff;
              margin: 0;
          }
  
          .about-section .image-column .inner-column .author-desc span {
              font-size: 16px;
              letter-spacing: 6px;
              text-align: center;
              color: #fff;
              display: block;
              font-weight: 400;
          }
  
          .about-section .image-column .inner-column:before {
              content: '';
              position: absolute;
              width: calc(50% + 80px);
              height: calc(100% + 160px);
              top: -80px;
              left: -3px;
              background: transparent;
              z-index: 0;
              border: 44px solid #00aeef;
          }
  
          .about-section .image-column .image-1 {
              position: relative;
          }
  
          .about-section .image-column .image-2 {
              position: absolute;
              left: 0;
              bottom: 0;
          }
  
          .about-section .image-column .image-2 img,
          .about-section .image-column .image-1 img {
              box-shadow: 0 30px 50px rgba(8, 13, 62, .15);
              border-radius: 46px;
          }
  
          .about-section .image-column .video-link {
              position: absolute;
              left: 70px;
              top: 170px;
          }
  
          .about-section .image-column .video-link .link {
              position: relative;
              display: block;
              font-size: 22px;
              color: #191e34;
              font-weight: 400;
              text-align: center;
              height: 100px;
              width: 100px;
              line-height: 100px;
              background-color: #ffffff;
              border-radius: 50%;
              box-shadow: 0 30px 50px rgba(8, 13, 62, .15);
              -webkit-transition: all 300ms ease;
              -moz-transition: all 300ms ease;
              -ms-transition: all 300ms ease;
              -o-transition: all 300ms ease;
              transition: all 300ms ease;
          }
      </style>
  </head>
  <body>
      <section class="about-section">
          <div class="container">
              <div class="row">
                  <div class="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                      <div class="inner-column">
                          <div class="sec-title">
                              <span class="title">Our Privacy Policy</span>
                          </div>
                          <div class="text">These terms and conditions outline the rules and regulations for the use of
                              our company.</div>
                          <div class="text">By accessing this website we assume you accept these terms and conditions. Do
                              not continue to use our website if you do not agree to take all of the terms and conditions
                              stated on this page.</div>
                          <div class="text">The following terminology applies to these Terms and Conditions, Privacy
                              Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to
                              you, the person log on this website and compliant to the Company's terms and conditions.
                              “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”,
                              or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance
                              and consideration of payment necessary to undertake the process of our assistance to the
                              Client in the most appropriate manner for the express purpose of meeting the Client's needs
                              in respect of provision of the Company's stated services, in accordance with and subject to,
                              prevailing law of Netherlands. Any use of the above terminology or other words in the
                              singular, plural, capitalization and/or he/she or they, are taken as interchangeable and
                              therefore as referring to same.</div>
                          <div class="sec-title">
                              <span class="title">Cookies</span>
                          </div>
                          <div class="text">We employ the use of cookies. By accessing our website, you agreed to use
                              cookies in agreement with our company's Privacy Policy.</div>
                          <div class="text">Most interactive websites use cookies to let us retrieve the user's details
                              for each visit. Cookies are used by our website to enable the functionality of certain areas
                              to make it easier for people visiting our website. Some of our affiliate/advertising
                              partners may also use cookies.</div>
                          <div class="sec-title">
                              <span class="title">License</span>
                          </div>
                          <div class="text">Unless otherwise stated, LOPYI and its licensors own the intellectual property
                              rights for all material on our website. All intellectual property rights are reserved. You
                              may access this from our website for your own personal use subjected to restrictions set in
                              these terms and conditions.</div>
                          <div class="text">You must not:
                              <ul>
                                  <li>Republish material from our website</li>
                                  <li>Sell, rent or sub-license material from our website</li>
                                  <li>Reproduce, duplicate or copy material from our website</li>
                                  <li>Redistribute content from our website</li>
                              </ul>
                          </div>
                          <div class="text">This Agreement shall begin on the date hereof.</div>
                          <div class="text">Parts of this website offer an opportunity for users to post and exchange
                              opinions and information in certain areas of the website. LOPYI does not filter, edit,
                              publish or review Comments prior to their presence on the website. Comments do not reflect
                              the views and opinions of LOPYI,its agents and/or affiliates. Comments reflect the views and
                              opinions of the person who post their views and opinions. To the extent permitted by
                              applicable laws, LOPYI shall not be liable for the Comments or for any liability, damages or
                              expenses caused and/or suffered as a result of any use of and/or posting of and/or
                              appearance of the Comments on this website.</div>
                          <div class="text">LOPYI reserves the right to monitor all Comments and to remove any Comments
                              which can be considered inappropriate, offensive or causes breach of these Terms and
                              Conditions.</div>
                          <div class="text">You warrant and represent that:
                              <ul>
                                  <li>You are entitled to post the Comments on our website and have all necessary licenses
                                      and consents to do so;</li>
                                  <li>The Comments do not invade any intellectual property right, including without
                                      limitation copyright, patent or trademark of any third party;</li>
                                  <li>The Comments do not contain any defamatory, libelous, offensive, indecent or
                                      otherwise unlawful material which is an invasion of privacy</li>
                                  <li>The Comments will not be used to solicit or promote business or custom or present
                                      commercial activities or unlawful activity.</li>
                              </ul>
                          </div>
                          <div class="text">You hereby grant LOPYI a non-exclusive license to use, reproduce, edit and
                              authorize others to use, reproduce and edit any of your Comments in any and all forms,
                              formats or media.</div>
                          <div class="sec-title">
                              <span class="title">Hyperlinking to our Content</span>
                          </div>
                          <div class="text">The following organizations may link to our website without prior written
                              approval:
                              <ul>
                                  <li>Government agencies;</li>
                                  <li>Search engines;</li>
                                  <li>News organizations;</li>
                                  <li>
                                      Online directory distributors may link to our website in the same manner
                                      as they hyperlink to the websites of other listed businesses; and
                                  </li>
                                  <li>
                                      System wide Accredited Businesses except soliciting non-profit
                                      organizations, charity shopping malls, and charity fundraising groups
                                      which may not hyperlink to our Web site.
                                  </li>
                              </ul>
                          </div>
                          <div class="text">These organizations may link to our home page, to publications or to other
                              website information so long as the link: (a) is not in any way deceptive; (b) does not
                              falsely imply sponsorship, endorsement or approval of the linking party and its products
                              and/or services; and (c) fits within the context of the linking party's site.</div>
                          <div class="text">We may consider and approve other link requests from the following types of
                              organizations:
                              <ul>
                                  <li>commonly-known consumer and/or business information sources;</li>
                                  <li>dot.com community sites;</li>
                                  <li>associations or other groups representing charities;</li>
                                  <li>online directory distributors;</li>
                                  <li>internet portals;</li>
                                  <li>accounting, law and consulting firms; and</li>
                                  <li>educational institutions and trade associations.</li>
                              </ul>
                          </div>
                          <div class="text">We will approve link requests from these organizations if we decide that: (a)
                              the link would not make us look unfavorably to ourselves or to our accredited businesses;
                              (b) the organization does not have any negative records with us; (c) the benefit to us from
                              the visibility of the hyperlink compensates the absence of LOPYI; and (d) the link is in the
                              context of general resource information.</div>
                          <div class="text">These organizations may link to our home page so long as the link: (a) is not
                              in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the
                              linking party and its products or services; and (c) fits within the context of the linking
                              party's site.</div>
                          <div class="text">If you are one of the organizations listed in paragraph 2 above and are
                              interested in linking to our website, you must inform us by sending an e-mail to our
                              company. Please include your name, your organization name, contact information as well as
                              the URL of your site, a list of any URLs from which you intend to link to our website, and a
                              list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
                          </div>
                          <div class="text">Approved organizations may hyperlink to our website as follows:
                              <ul>
                                  <li>By use of our corporate name; or</li>
                                  <li>By use of the uniform resource locator being linked to; or</li>
                                  <li>
                                      By use of any other description of our website being linked to that makes
                                      sense within the context and format of content on the linking party's
                                      site.
                                  </li>
                                  <li>
                                      No use of our company's logo or other artwork will be allowed for linking
                                      absent a trademark license agreement.
                                  </li>
                              </ul>
                          </div>
                          <div class="sec-title">
                              <span class="title">iFrames</span>
                          </div>
                          <div class="text">Without prior approval and written permission, you may not create frames
                              around our Webpages that alter in any way the visual presentation or appearance of our
                              website.
                          </div>
                          <div class="sec-title">
                              <span class="title">Content Liability</span>
                          </div>
                          <div class="text">We shall not be hold responsible for any content that appears on your website.
                              You agree to protect and defend us against all claims that is rising on your website. No
                              link(s) should appear on any website that may be interpreted as libelous, obscene or
                              criminal, or which infringes, otherwise violates, or advocates the infringement or other
                              violation of, any third party rights.
                          </div>
                          <div class="sec-title">
                              <span class="title">Reservation of Rights</span>
                          </div>
                          <div class="text">We reserve the right to request that you remove all links or any particular
                              link to our website. You approve to immediately remove all links to our website upon
                              request. We also reserve the right to amen these terms and conditions and it's linking
                              policy at any time. By continuously linking to our website, you agree to be bound to and
                              follow these linking terms and conditions.
                          </div>
                          <div class="sec-title">
                              <span class="title">Removal of links from our website</span>
                          </div>
                          <div class="text">If you find any link on our website that is offensive for any reason, you are
                              free to contact and inform us any moment. We will consider requests to remove links but we
                              are not obligated to or so or to respond to you directly.
                          </div>
                          <div class="text">We do not ensure that the information on this website is correct, we do not
                              warrant its completeness or accuracy; nor do we promise to ensure that the website remains
                              available or that the material on the website is kept up to date.
                          </div>
                          <div class="sec-title">
                              <span class="title">Disclaimer</span>
                          </div>
                          <div class="text">To the maximum extent permitted by applicable law, we exclude all
                              representations, warranties and conditions relating to our website and the use of this
                              website. Nothing in this disclaimer will:
                              <ul>
                                  <li>
                                      limit or exclude our or your liability for death or personal injury;
                                  </li>
                                  <li>
                                      limit or exclude our or your liability for fraud or fraudulent
                                      misrepresentation;
                                  </li>
                                  <li>
                                      limit any of our or your liabilities in any way that is not permitted
                                      under applicable law; or
                                  </li>
                                  <li>
                                      exclude any of our or your liabilities that may not be excluded under
                                      applicable law.
                                  </li>
                              </ul>
                          </div>
                          <div class="text">The limitations and prohibitions of liability set in this Section and
                              elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all
                              liabilities arising under the disclaimer, including liabilities arising in contract, in tort
                              and for breach of statutory duty.
                          </div>
                          <div class="text">As long as the website and the information and services on the website are
                              provided free of charge, we will not be liable for any loss or damage of any nature.
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  </body>
  </html>`;


    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'space-between',
            }}>
            <View style={{ flex: 1 }}>
                {screen === 'About' ? (
                    <SafeAreaView style={{ flex: 1 }}>
                        <WebView source={{ html: aboutUsHTML }} />
                    </SafeAreaView>
                ) : screen === 'Terms' ? (
                    <SafeAreaView style={{ flex: 1 }}>
                        <WebView source={{ html: termsConditionHTML }} />
                    </SafeAreaView>
                ) : screen === 'Privacy' ? (
                    <SafeAreaView style={{ flex: 1 }}>
                        <WebView source={{ html: privacyPolicyHTML }} />
                    </SafeAreaView>
                ) : (
                    <></>
                )}
            </View>
            <BottomTab />
        </View>
    );
};

export default CustomView;
