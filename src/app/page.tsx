export default function Home() {
  return (
    <p
      style={{
        position: 'fixed',
        bottom: '3rem',
        right: '3rem',
        maxWidth: 200,
        fontFamily: 'var(--font-dm-mono), monospace',
        fontWeight: 300,
        fontSize: '0.65rem',
        lineHeight: 2,
        color: '#f5f5f5',
        opacity: 0.75,
        whiteSpace: 'pre-line',
        textAlign: 'left',
      }}
    >
      Based in Ōtautahi,{'\n'}
      Aotearoa.{'\n'}
      Full-stack web developer{'\n'}
      specialising in React,{'\n'}
      Next.js, and motion design.{'\n'}
      Building digital experiences{'\n'}
      that integrate{'\n'}
      Te Ao Māori values.{'\n'}
      Available for projects.
    </p>
  )
}
