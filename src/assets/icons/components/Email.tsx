import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgEmail = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'12'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'12'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#email_svg__a)'}>
      <path
        d={
          'M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m0 2-6.5 4.47a1 1 0 0 1-1 0L5 6z'
        }
        fill={'currentColor'}
      />
    </g>
    <defs>
      <clipPath id={'email_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'currentColor'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgEmail)
const Memo = memo(ForwardRef)

export default Memo
