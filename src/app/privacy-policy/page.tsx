import type { Metadata } from 'next'
import ObfuscatedEmail from '@/components/ui/ObfuscatedEmail'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Liégeois Designs — how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://liegeoisdesigns.com/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <main style={{ background: 'var(--color-dark)', minHeight: '100vh' }}>
        <article
          className="prose"
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding:
              'calc(80px + clamp(48px, 6vw, 80px)) var(--section-pad-x) clamp(64px, 8vw, 120px)',
          }}
        >
          <p
            className="type-label"
            style={{ color: 'var(--color-on-dark-faint)', margin: '0 0 20px' }}
          >
            Effective August 1, 2021
          </p>
          <h1
            className="type-display"
            style={{ color: 'var(--color-on-dark)', margin: '0 0 48px' }}
          >
            Privacy Policy
          </h1>

          <p className="type-body" style={bodyStyle}>
            Protecting your private information is a priority. This Privacy Policy applies to
            liegeoisdesigns.com and governs the collection and use of data. Unless otherwise noted,
            all references to the Liégeois Designs website include liegeoisdesigns.com and Arthur
            Liégeois. This website provides freelance design services. By using this site, you
            consent to the data practices described in this statement.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Collection of Your Personal Information
          </h2>
          <p className="type-body" style={bodyStyle}>
            To provide services offered on this site, Arthur Liégeois may collect personally
            identifiable information, such as your first and last name and email address.
          </p>
          <p className="type-body" style={bodyStyle}>
            Arthur Liégeois does not collect personal information unless you voluntarily provide it.
            You may be required to provide certain details when using specific site features, such
            as registering for an account, signing up for offers, sending messages, or submitting
            payment information. This information is used to communicate with you about requested
            services or products. Additional personal or non-personal information may also be
            collected in the future.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Use of Personal Information
          </h2>
          <p className="type-body" style={bodyStyle}>
            Arthur Liégeois collects and uses personal information to operate the site and deliver
            requested services. Personal information may also be used to inform you of other
            products or services available from Arthur Liégeois and affiliates.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Sharing Information with Third Parties
          </h2>
          <p className="type-body" style={bodyStyle}>
            Arthur Liégeois does not sell, rent, or lease customer information to third parties.
            Data may be shared with trusted service providers for purposes such as analytics,
            communications, customer support, or logistics. These providers are required to maintain
            confidentiality and use the data only for services provided to Arthur Liégeois.
          </p>
          <p className="type-body" style={bodyStyle}>
            Information may also be disclosed, without notice, if required by law or in good faith
            to comply with legal obligations, protect rights or property, or ensure user and public
            safety.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Tracking User Behavior
          </h2>
          <p className="type-body" style={bodyStyle}>
            Arthur Liégeois may track website pages visited in order to understand which services
            are most popular and to improve the user experience. Tracking may include activity such
            as mouse clicks and on-site behavior.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Automatically Collected Information
          </h2>
          <p className="type-body" style={bodyStyle}>
            Information about your computer hardware and software may be collected automatically.
            This includes IP address, browser type, domain names, access times, and referring
            websites. This data is used to operate services, maintain quality, and compile general
            website statistics.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Use of Cookies
          </h2>
          <p className="type-body" style={bodyStyle}>
            This website may use cookies to personalize the online experience. Cookies are small
            text files placed on your device to help recall preferences on future visits. Cookies
            may store information such as billing or shipping addresses, login details, or
            customized settings. Most browsers accept cookies automatically, but you can adjust
            settings to decline them. If declined, some features may not function properly.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Links
          </h2>
          <p className="type-body" style={bodyStyle}>
            This site may contain links to third-party websites. Arthur Liégeois is not responsible
            for the privacy practices or content of external sites. Users are encouraged to review
            the privacy policies of any site that collects personal information.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Security of Your Personal Information
          </h2>
          <p className="type-body" style={bodyStyle}>
            Arthur Liégeois uses industry-standard measures, including SSL encryption, to secure
            personal data from unauthorized access, use, or disclosure. While reasonable safeguards
            are in place, no method of internet transmission or electronic storage is completely
            secure. By using this site, you acknowledge these inherent limitations.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Right to Deletion
          </h2>
          <p className="type-body" style={bodyStyle}>
            Upon verified request, Arthur Liégeois will delete personal information from records and
            direct service providers to do the same, unless retention is required to:
          </p>
          <ul className="type-body" style={listStyle}>
            <li>Complete a transaction or fulfill a contract.</li>
            <li>Detect and prevent fraud or illegal activity.</li>
            <li>Debug or repair errors.</li>
            <li>Exercise or protect legal rights.</li>
            <li>Comply with applicable law or regulatory obligations.</li>
            <li>
              Support research or internal uses reasonably aligned with your relationship with
              Arthur Liégeois.
            </li>
          </ul>

          <h2 className="type-h2" style={h2Style}>
            Children Under Thirteen
          </h2>
          <p className="type-body" style={bodyStyle}>
            Arthur Liégeois does not knowingly collect information from children under 13. If you
            are under 13, you must obtain parental or guardian consent to use this site.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Email Communications
          </h2>
          <p className="type-body" style={bodyStyle}>
            Arthur Liégeois may send email communications regarding announcements, offers, surveys,
            or updates. Engagement with emails (such as opens or link clicks) may be tracked for
            service improvement. Users may opt out at any time by clicking the
            &ldquo;unsubscribe&rdquo; link in emails.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Changes to This Policy
          </h2>
          <p className="type-body" style={bodyStyle}>
            Arthur Liégeois reserves the right to update this Privacy Policy at any time. Significant
            changes will be communicated via email (where applicable) or prominently on the website.
            Continued use of the site after changes indicates acceptance of the updated policy.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Contact Information
          </h2>
          <p className="type-body" style={bodyStyle}>
            Arthur Liégeois welcomes questions or comments regarding this Privacy Policy:
          </p>
          <p className="type-body" style={bodyStyle}>
            Arthur Liégeois
            <br />
            Montclair, NJ
            <br />
            <ObfuscatedEmail style={linkStyle} />
          </p>
        </article>
      </main>
    </>
  )
}

const bodyStyle: React.CSSProperties = {
  color: 'var(--color-on-dark-muted)',
  margin: '0 0 20px',
}

const h2Style: React.CSSProperties = {
  color: 'var(--color-on-dark)',
  margin: '48px 0 16px',
  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
}

const listStyle: React.CSSProperties = {
  color: 'var(--color-on-dark-muted)',
  margin: '0 0 20px',
  paddingLeft: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
}

const linkStyle: React.CSSProperties = {
  color: 'var(--color-on-dark-muted)',
  textDecoration: 'none',
}
