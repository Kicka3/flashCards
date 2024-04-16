import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgHeart = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'12'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'12'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#heart_svg__a)'}>
      <path
        d={
          'M12 21a1 1 0 0 1-.71-.29l-7.77-7.78a5.26 5.26 0 0 1 0-7.4 5.24 5.24 0 0 1 7.4 0L12 6.61l1.08-1.08a5.24 5.24 0 0 1 7.4 0 5.26 5.26 0 0 1 0 7.4l-7.77 7.78A1 1 0 0 1 12 21'
        }
        fill={'currentColor'}
      />
    </g>
    <defs>
      <clipPath id={'heart_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'currentColor'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgHeart)
const Memo = memo(ForwardRef)

export default Memo
