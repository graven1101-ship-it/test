import { Heart } from "lucide-react"
import { Link } from "react-router-dom"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="px-4 py-6 lg:px-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made </span>
          
            <span>by</span>
            <Link
              to="https://shadcnstore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Raven Team
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            if site .
          </p>
        </div>
      </div>
    </footer>
  )
}
