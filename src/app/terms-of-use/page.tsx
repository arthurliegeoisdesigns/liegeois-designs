import type { Metadata } from 'next'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use for Liégeois Designs — the rules and conditions that govern your use of liegeoisdesigns.com.',
  alternates: { canonical: 'https://liegeoisdesigns.com/terms-of-use' },
}

export default function TermsOfUsePage() {
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
            Terms of Use
          </h1>

          <p className="type-body" style={bodyStyle}>
            Welcome to liegeoisdesigns.com. These Terms of Use govern your access to and use of this
            website operated by Arthur Liégeois. By accessing or using this site, you agree to be
            bound by these terms. If you do not agree, please do not use the site.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Use of the Site
          </h2>
          <p className="type-body" style={bodyStyle}>
            This website is intended to showcase the portfolio and services of Arthur Liégeois. You
            may browse, download, or print content from this site for personal, non-commercial use
            only. You may not reproduce, distribute, modify, or create derivative works from any
            content without prior written permission.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Intellectual Property
          </h2>
          <p className="type-body" style={bodyStyle}>
            All content on this website — including but not limited to text, images, graphics,
            logos, videos, case studies, and design work — is the property of Arthur Liégeois or
            used with permission from respective clients. Unauthorized use of any materials may
            violate copyright, trademark, and other applicable laws.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Client Work and Case Studies
          </h2>
          <p className="type-body" style={bodyStyle}>
            Case studies and portfolio pieces displayed on this site are presented with the
            permission of the respective clients. The work shown remains the intellectual property
            of the respective parties as agreed upon in individual project contracts. Displaying
            work on this site does not transfer ownership or grant any license to third parties.
          </p>

          <h2 className="type-h2" style={h2Style}>
            User Conduct
          </h2>
          <p className="type-body" style={bodyStyle}>
            When using this site, you agree not to:
          </p>
          <ul className="type-body" style={listStyle}>
            <li>Use the site for any unlawful purpose.</li>
            <li>Attempt to gain unauthorized access to any part of the site or its systems.</li>
            <li>Interfere with or disrupt the site or servers connected to it.</li>
            <li>Scrape, harvest, or collect data from the site without permission.</li>
            <li>Impersonate any person or entity in communications through the site.</li>
          </ul>

          <h2 className="type-h2" style={h2Style}>
            Third-Party Links
          </h2>
          <p className="type-body" style={bodyStyle}>
            This site may contain links to external websites. Arthur Liégeois is not responsible for
            the content, privacy practices, or terms of use of any linked sites. Accessing
            third-party sites is at your own risk.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Disclaimer of Warranties
          </h2>
          <p className="type-body" style={bodyStyle}>
            This website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
            basis. Arthur Liégeois makes no warranties, express or implied, regarding the accuracy,
            reliability, or availability of the site or its content. To the fullest extent permitted
            by law, all warranties — including implied warranties of merchantability, fitness for a
            particular purpose, and non-infringement — are disclaimed.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Limitation of Liability
          </h2>
          <p className="type-body" style={bodyStyle}>
            In no event shall Arthur Liégeois be liable for any direct, indirect, incidental,
            consequential, or punitive damages arising from your use of or inability to use this
            site. This limitation applies regardless of the legal theory under which damages are
            sought and whether Arthur Liégeois has been advised of the possibility of such damages.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Indemnification
          </h2>
          <p className="type-body" style={bodyStyle}>
            You agree to indemnify and hold harmless Arthur Liégeois from any claims, damages,
            losses, or expenses (including reasonable attorney fees) arising from your use of the
            site or violation of these terms.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Changes to These Terms
          </h2>
          <p className="type-body" style={bodyStyle}>
            Arthur Liégeois reserves the right to update or modify these Terms of Use at any time
            without prior notice. Changes become effective immediately upon posting. Your continued
            use of the site after any modifications constitutes acceptance of the updated terms.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Governing Law
          </h2>
          <p className="type-body" style={bodyStyle}>
            These Terms of Use shall be governed by and construed in accordance with the laws of the
            State of New Jersey, without regard to its conflict of law provisions.
          </p>

          <h2 className="type-h2" style={h2Style}>
            Contact Information
          </h2>
          <p className="type-body" style={bodyStyle}>
            Questions about these Terms of Use may be directed to:
          </p>
          <p className="type-body" style={bodyStyle}>
            Arthur Liégeois
            <br />
            22 Montclair Ave, Montclair, NJ 07042
            <br />
            <a href="mailto:arthur@liegeoisdesigns.com" style={linkStyle}>
              arthur@liegeoisdesigns.com
            </a>
          </p>
        </article>
      </main>
      <Footer />
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
