import React from 'react';

const PrivacyPolicy = () => {
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      color: '#333',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
      borderBottom: '2px solid #007bff',
      paddingBottom: '1rem',
    },
    title: {
      fontSize: '2.5rem',
      margin: '0 0 0.5rem 0',
      color: '#007bff',
    },
    lastUpdated: {
      fontSize: '0.9rem',
      color: '#666',
      fontStyle: 'italic',
    },
    section: {
      marginBottom: '2rem',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#333',
      borderBottom: '1px solid #ddd',
      paddingBottom: '0.5rem',
    },
    subTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      marginTop: '1rem',
      color: '#555',
    },
    paragraph: {
      marginBottom: '1rem',
      textAlign: 'justify',
    },
    list: {
      paddingLeft: '2rem',
      marginBottom: '1rem',
    },
    listItem: {
      marginBottom: '0.5rem',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
    },
    contactBox: {
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '5px',
      padding: '1.5rem',
      marginTop: '2rem',
    },
    contactTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#333',
    },
    strong: {
      fontWeight: 'bold',
    },
    tocList: {
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '5px',
      padding: '1rem',
      marginBottom: '2rem',
    },
    tocTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    tocLink: {
      color: '#007bff',
      textDecoration: 'none',
      display: 'block',
      padding: '0.25rem 0',
    },
    highlight: {
      backgroundColor: '#fff3cd',
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #ffeaa7',
      marginBottom: '1rem',
    },
    shortDescription: {
      fontStyle: 'italic',
      color: '#666',
      marginBottom: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>PRIVACY POLICY</h1>
        <p style={styles.lastUpdated}>Last updated July 02, 2025</p>
      </header>

      <div style={styles.paragraph}>
        This Privacy Notice for Sports IIT PKD ("<span style={styles.strong}>we</span>," "<span style={styles.strong}>us</span>," or "<span style={styles.strong}>our</span>"), describes how and why we might access, collect, store, use, and/or share ("<span style={styles.strong}>process</span>") your personal information when you use our services ("<span style={styles.strong}>Services</span>"), including when you:
      </div>
      <ul style={styles.list}>
        <li style={styles.listItem}>Visit our website at <a href="https://sports-iitpkd.vercel.app/" style={styles.link}>https://sports-iitpkd.vercel.app/</a> or any website of ours that links to this Privacy Notice</li>
        <li style={styles.listItem}>Engage with us in other related ways, including any sales, marketing, or events</li>
      </ul>
      
      <p style={styles.paragraph}>
        <span style={styles.strong}>Questions or concerns?</span> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:sec_sports@smail.iitpkd.ac.in" style={styles.link}>sec_sports@smail.iitpkd.ac.in</a>.
      </p>

      <div style={styles.highlight}>
        <h2 style={styles.contactTitle}>SUMMARY OF KEY POINTS</h2>
        <p style={styles.paragraph}>
          <em>This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</em>
        </p>
        
        <p style={styles.paragraph}>
          <span style={styles.strong}>What personal information do we process?</span> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. <a href="#section1" style={styles.link}>Learn more about personal information you disclose to us</a>.
        </p>
        
        <p style={styles.paragraph}>
          <span style={styles.strong}>Do we process any sensitive personal information?</span> Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.
        </p>
        
        <p style={styles.paragraph}>
          <span style={styles.strong}>Do we collect any information from third parties?</span> We do not collect any information from third parties.
        </p>
        
        <p style={styles.paragraph}>
          <span style={styles.strong}>How do we process your information?</span> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. <a href="#section2" style={styles.link}>Learn more about how we process your information</a>.
        </p>
        
        <p style={styles.paragraph}>
          <span style={styles.strong}>In what situations and with which parties do we share personal information?</span> We may share information in specific situations and with specific third parties. <a href="#section3" style={styles.link}>Learn more about when and with whom we share your personal information</a>.
        </p>
        
        <p style={styles.paragraph}>
          <span style={styles.strong}>How do we keep your information safe?</span> We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. <a href="#section6" style={styles.link}>Learn more about how we keep your information safe</a>.
        </p>
        
        <p style={styles.paragraph}>
          <span style={styles.strong}>What are your rights?</span> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. <a href="#section7" style={styles.link}>Learn more about your privacy rights</a>.
        </p>
        
        <p style={styles.paragraph}>
          <span style={styles.strong}>How do you exercise your rights?</span> The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
        </p>
        
        <p style={styles.paragraph}>
          Want to learn more about what we do with any information we collect? Review the Privacy Notice in full.
        </p>
      </div>

      <div style={styles.tocList}>
        <h2 style={styles.tocTitle}>TABLE OF CONTENTS</h2>
        <a href="#section1" style={styles.tocLink}>1. WHAT INFORMATION DO WE COLLECT?</a>
        <a href="#section2" style={styles.tocLink}>2. HOW DO WE PROCESS YOUR INFORMATION?</a>
        <a href="#section3" style={styles.tocLink}>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a>
        <a href="#section4" style={styles.tocLink}>4. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a>
        <a href="#section5" style={styles.tocLink}>5. HOW LONG DO WE KEEP YOUR INFORMATION?</a>
        <a href="#section6" style={styles.tocLink}>6. HOW DO WE KEEP YOUR INFORMATION SAFE?</a>
        <a href="#section7" style={styles.tocLink}>7. WHAT ARE YOUR PRIVACY RIGHTS?</a>
        <a href="#section8" style={styles.tocLink}>8. CONTROLS FOR DO-NOT-TRACK FEATURES</a>
        <a href="#section9" style={styles.tocLink}>9. DO WE MAKE UPDATES TO THIS NOTICE?</a>
        <a href="#section10" style={styles.tocLink}>10. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>
        <a href="#section11" style={styles.tocLink}>11. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a>
      </div>

      <section id="section1" style={styles.section}>
        <h2 style={styles.sectionTitle}>1. WHAT INFORMATION DO WE COLLECT?</h2>
        
        <h3 style={styles.subTitle}>Personal information you disclose to us</h3>
        <p style={styles.shortDescription}><em>In Short: We collect personal information that you provide to us.</em></p>
        
        <p style={styles.paragraph}>
          We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
        </p>
        
        <p style={styles.paragraph}>
          <span style={styles.strong}>Personal Information Provided by You.</span> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>names</li>
          <li style={styles.listItem}>email addresses</li>
          <li style={styles.listItem}>contact preferences</li>
          <li style={styles.listItem}>usernames</li>
          <li style={styles.listItem}>passwords</li>
          <li style={styles.listItem}>contact or authentication data</li>
        </ul>
        
        <p style={styles.paragraph}>
          <span style={styles.strong}>Sensitive Information.</span> We do not process sensitive information.
        </p>
        
        <p style={styles.paragraph}>
          <span style={styles.strong}>Social Media Login Data.</span> We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile information about you from the social media provider, as described in the section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?" below.
        </p>
        
        <p style={styles.paragraph}>
          All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
        </p>
        
        <h3 style={styles.subTitle}>Google API</h3>
        <p style={styles.paragraph}>
          Our use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.
        </p>
      </section>

      <section id="section2" style={styles.section}>
        <h2 style={styles.sectionTitle}>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
        <p style={styles.shortDescription}><em>In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</em></p>
        
        <p style={styles.paragraph}>
          We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}><span style={styles.strong}>To facilitate account creation and authentication and otherwise manage user accounts.</span> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
          <li style={styles.listItem}><span style={styles.strong}>To deliver and facilitate delivery of services to the user.</span> We may process your information to provide you with the requested service.</li>
          <li style={styles.listItem}><span style={styles.strong}>To respond to user inquiries/offer support to users.</span> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
          <li style={styles.listItem}><span style={styles.strong}>To fulfill and manage your orders.</span> We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.</li>
          <li style={styles.listItem}><span style={styles.strong}>To enable user-to-user communications.</span> We may process your information if you choose to use any of our offerings that allow for communication with another user.</li>
          <li style={styles.listItem}><span style={styles.strong}>To request feedback.</span> We may process your information when necessary to request feedback and to contact you about your use of our Services.</li>
        </ul>
      </section>

      <section id="section3" style={styles.section}>
        <h2 style={styles.sectionTitle}>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
        <p style={styles.shortDescription}><em>In Short: We may share information in specific situations described in this section and/or with the following third parties.</em></p>
        
        <p style={styles.paragraph}>
          We may need to share your personal information in the following situations:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}><span style={styles.strong}>Business Transfers.</span> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          <li style={styles.listItem}><span style={styles.strong}>Affiliates.</span> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.</li>
        </ul>
      </section>

      <section id="section4" style={styles.section}>
        <h2 style={styles.sectionTitle}>4. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
        <p style={styles.shortDescription}><em>In Short: If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</em></p>
        
        <p style={styles.paragraph}>
          Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
        </p>
        
        <p style={styles.paragraph}>
          We will use the information we receive only for the purposes that are described in this Privacy Notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.
        </p>
      </section>

      <section id="section5" style={styles.section}>
        <h2 style={styles.sectionTitle}>5. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
        <p style={styles.shortDescription}><em>In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</em></p>
        
        <p style={styles.paragraph}>
          We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.
        </p>
        
        <p style={styles.paragraph}>
          When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
        </p>
      </section>

      <section id="section6" style={styles.section}>
        <h2 style={styles.sectionTitle}>6. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
        <p style={styles.shortDescription}><em>In Short: We aim to protect your personal information through a system of organizational and technical security measures.</em></p>
        
        <p style={styles.paragraph}>
          We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
        </p>
      </section>

      <section id="section7" style={styles.section}>
        <h2 style={styles.sectionTitle}>7. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
        <p style={styles.shortDescription}><em>In Short: You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</em></p>
        
        <p style={styles.paragraph}>
          <span style={styles.strong}>Withdrawing your consent:</span> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.
        </p>
        
        <p style={styles.paragraph}>
          However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
        </p>
        
        <h3 style={styles.subTitle}>Account Information</h3>
        <p style={styles.paragraph}>
          If you would at any time like to review or change the information in your account or terminate your account, you can:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>Contact us using the contact information provided.</li>
        </ul>
        
        <p style={styles.paragraph}>
          Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.
        </p>
        
        <p style={styles.paragraph}>
          If you have questions or comments about your privacy rights, you may email us at <a href="mailto:sec_sports@smail.iitpkd.ac.in" style={styles.link}>sec_sports@smail.iitpkd.ac.in</a>.
        </p>
      </section>

      <section id="section8" style={styles.section}>
        <h2 style={styles.sectionTitle}>8. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
        <p style={styles.paragraph}>
          Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.
        </p>
      </section>

      <section id="section9" style={styles.section}>
        <h2 style={styles.sectionTitle}>9. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
        <p style={styles.shortDescription}><em>In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.</em></p>
        
        <p style={styles.paragraph}>
          We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
        </p>
      </section>

      <section id="section10" style={styles.section}>
        <h2 style={styles.sectionTitle}>10. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
        <p style={styles.paragraph}>
          If you have questions or comments about this notice, you may email us at <a href="mailto:sec_sports@smail.iitpkd.ac.in" style={styles.link}>sec_sports@smail.iitpkd.ac.in</a> or contact us by post at:
        </p>
        <div style={styles.contactBox}>
          <p style={styles.paragraph}>
            Sports IIT PKD<br />
            IIT PALAKKAD<br />
            Kanjikode<br />
            Palakkad, Kerala 678623<br />
            India
          </p>
        </div>
      </section>

      <section id="section11" style={styles.section}>
        <h2 style={styles.sectionTitle}>11. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
        <p style={styles.paragraph}>
          Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please fill out and submit a data subject access request.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;