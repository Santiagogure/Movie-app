import { CustomComponentProps, Film } from '../interfaces'
import { mergeClassName } from '../utils'
import { Container } from './Container'

interface Props extends CustomComponentProps {
  title?: string
  filter?: any
  onTitleClick?: () => void
  filterByMediaType?: Function
  hidden?: boolean
  showFilter?: boolean
}

export const Section = (props: Props) => {
  if (props.hidden) return <></>
  if (props.hidden) return <></>

  return (
    <Container className={props.className}>
      {props.title ? (
        <h1
          onClick={props.onTitleClick}
          className={mergeClassName(
            'max-w-[80%] text-xl lg:text-xl ',
            props.onTitleClick ? 'cursor-pointer hover:text-primary' : ''
          )}
          dangerouslySetInnerHTML={{
            __html: props.title,
          }}
        ></h1>
      ) : (
        ''
      )}

      {props.children}

      {props.showFilter && props.filterByMediaType && props.filter ? (
        <div
          className={`flex items-center justify-center text-2xl space-x-5 
      
        `}
        >
          <button
            onClick={() =>
              props.filterByMediaType ? props.filterByMediaType('tv') : ''
            }
          >
            TV
          </button>
          <button
            onClick={() =>
              props.filterByMediaType ? props.filterByMediaType('movie') : ''
            }
          >
            Movies
          </button>
        </div>
      ) : (
        ''
      )}
    </Container>
  )
}
