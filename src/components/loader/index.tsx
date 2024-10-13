import spinnerStyles from "./loader.module.css"

export const Spinner = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 100 100'
    preserveAspectRatio='xMidYMid'
    width='150'
    height='150'
    className={spinnerStyles.spinner_container}
  >
    <g>
      <g transform='translate(80,50)'>
        <g transform='rotate(0)'>
          <circle fillOpacity='1' fill='#4c4cff' r='6' cy='0' cx='0'>
            <animateTransform
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              values='1.36 1.36;1 1'
              begin='-0.8838383838383839s'
              type='scale'
              attributeName='transform'
            />
            <animate
              begin='-0.8838383838383839s'
              values='1;0'
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              attributeName='fill-opacity'
            />
          </circle>
        </g>
      </g>
      <g transform='translate(71.21320343559643,71.21320343559643)'>
        <g transform='rotate(45)'>
          <circle fillOpacity='0.875' fill='#4c4cff' r='6' cy='0' cx='0'>
            <animateTransform
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              values='1.36 1.36;1 1'
              begin='-0.7575757575757576s'
              type='scale'
              attributeName='transform'
            />
            <animate
              begin='-0.7575757575757576s'
              values='1;0'
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              attributeName='fill-opacity'
            />
          </circle>
        </g>
      </g>
      <g transform='translate(50,80)'>
        <g transform='rotate(90)'>
          <circle fillOpacity='0.75' fill='#4c4cff' r='6' cy='0' cx='0'>
            <animateTransform
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              values='1.36 1.36;1 1'
              begin='-0.6313131313131313s'
              type='scale'
              attributeName='transform'
            />
            <animate
              begin='-0.6313131313131313s'
              values='1;0'
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              attributeName='fill-opacity'
            />
          </circle>
        </g>
      </g>
      <g transform='translate(28.786796564403577,71.21320343559643)'>
        <g transform='rotate(135)'>
          <circle fillOpacity='0.625' fill='#4c4cff' r='6' cy='0' cx='0'>
            <animateTransform
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              values='1.36 1.36;1 1'
              begin='-0.5050505050505051s'
              type='scale'
              attributeName='transform'
            />
            <animate
              begin='-0.5050505050505051s'
              values='1;0'
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              attributeName='fill-opacity'
            />
          </circle>
        </g>
      </g>
      <g transform='translate(20,50.00000000000001)'>
        <g transform='rotate(180)'>
          <circle fillOpacity='0.5' fill='#4c4cff' r='6' cy='0' cx='0'>
            <animateTransform
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              values='1.36 1.36;1 1'
              begin='-0.3787878787878788s'
              type='scale'
              attributeName='transform'
            />
            <animate
              begin='-0.3787878787878788s'
              values='1;0'
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              attributeName='fill-opacity'
            />
          </circle>
        </g>
      </g>
      <g transform='translate(28.78679656440357,28.786796564403577)'>
        <g transform='rotate(225)'>
          <circle fillOpacity='0.375' fill='#4c4cff' r='6' cy='0' cx='0'>
            <animateTransform
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              values='1.36 1.36;1 1'
              begin='-0.25252525252525254s'
              type='scale'
              attributeName='transform'
            />
            <animate
              begin='-0.25252525252525254s'
              values='1;0'
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              attributeName='fill-opacity'
            />
          </circle>
        </g>
      </g>
      <g transform='translate(49.99999999999999,20)'>
        <g transform='rotate(270)'>
          <circle fillOpacity='0.25' fill='#4c4cff' r='6' cy='0' cx='0'>
            <animateTransform
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              values='1.36 1.36;1 1'
              begin='-0.12626262626262627s'
              type='scale'
              attributeName='transform'
            />
            <animate
              begin='-0.12626262626262627s'
              values='1;0'
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              attributeName='fill-opacity'
            />
          </circle>
        </g>
      </g>
      <g transform='translate(71.21320343559643,28.78679656440357)'>
        <g transform='rotate(315)'>
          <circle fillOpacity='0.125' fill='#4c4cff' r='6' cy='0' cx='0'>
            <animateTransform
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              values='1.36 1.36;1 1'
              begin='0s'
              type='scale'
              attributeName='transform'
            />
            <animate
              begin='0s'
              values='1;0'
              repeatCount='indefinite'
              dur='1.0101010101010102s'
              keyTimes='0;1'
              attributeName='fill-opacity'
            />
          </circle>
        </g>
      </g>
      <g />
    </g>
  </svg>
)
