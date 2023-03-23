import { CustomComponentProps, Film } from '../interfaces'
import { mergeClassName } from '../utils'
import { Container } from './Container'

interface Props extends CustomComponentProps {
  title?: string
  filter?: any
  onTitleClick?: () => void
  filterByMediaType?: (mediaType: string) => void
  hidden?: boolean
  showFilter?: boolean
}

export const Section = ({
  className,
  title,
  filter,
  onTitleClick,
  filterByMediaType,
  hidden = false,
  showFilter = false,
  children,
}: Props) => {
  if (hidden) {
    return null
  }

  const handleFilterByMediaType = (mediaType: string) => {
    if (filterByMediaType) {
      filterByMediaType(mediaType)
    }
  }

  return (
    <Container className={className}>
      {title && (
        <h1
          onClick={onTitleClick}
          className={mergeClassName(
            'max-w-[80%] text-xl lg:text-xl ',
            onTitleClick ? 'cursor-pointer hover:text-primary' : ''
          )}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}

      {children}

      {showFilter && filterByMediaType && filter && (
        <div className="flex items-center justify-center text-2xl space-x-5">
          <button onClick={() => handleFilterByMediaType('tv')}>TV</button>
          <button onClick={() => handleFilterByMediaType('movie')}>
            Movies
          </button>
        </div>
      )}
    </Container>
  )
}
