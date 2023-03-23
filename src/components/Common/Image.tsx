import { CustomComponentProps } from '../../interfaces'
import { mergeClassName } from '../../utils'

interface Props extends CustomComponentProps {
  src: string
}

export const Image = (props: Props) => {
  return (
    <div
      className={mergeClassName(
        'bg-primary  h-full w-full rounded-lg overflow-hidden',
        props.className
      )}
    >
      <img
        alt=""
        src={props.src}
        className="min-h-[310px]  w-full h-full object-cover"
      ></img>
    </div>
  )
}
