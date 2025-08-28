
interface HeadingPrompt {
  head: string,
  title: string
}

export default function Heading({ head, title }: HeadingPrompt) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-primary mb-6">{head}</h2>
      <p className="text-xl text-muted-foreground">{title}
      </p>
    </div>
  )
}
