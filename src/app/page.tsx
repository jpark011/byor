import * as React from '@/react'
import * as ReactDOM from '@/react-dom'

const element = (
  <div id="foo">
    <a href="/" data-hello="world" className="hello-world">
      bar
    </a>
    <button onClick={() => alert('HELLO')}>Click ME</button>
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_11_4903)">
        <rect width={24} height={24} fill="white" />
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 21.5817C12 21.5817 20 13.9999 20 9.58167C20 5.16339 16.4183 1.58167 12 1.58167C7.58172 1.58167 4 5.16339 4 9.58167C4 13.9999 12 21.5817 12 21.5817ZM12 11.9999C13.6569 11.9999 15 10.6568 15 8.99994C15 7.34309 13.6569 5.99994 12 5.99994C10.3431 5.99994 9 7.34309 9 8.99994C9 10.6568 10.3431 11.9999 12 11.9999Z"
            fill="#1E293B"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_11_4903"
          x={0}
          y="1.58167"
          width={24}
          height={28}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_11_4903"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_11_4903"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_11_4903">
          <rect width={24} height={24} fill="white" />
        </clipPath>
      </defs>
    </svg>
    <br />
    <div style={{ color: 'red' }} className="apt-apt-apt">
      i'm a child!
    </div>
  </div>
) as unknown as React.Element

const container = document.getElementById('root')

if (!container) {
  throw 'No Container!'
}

ReactDOM.render(element, container)
