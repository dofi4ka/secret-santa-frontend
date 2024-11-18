interface VectorProps {
  pathClass: string | null
}

export default function TelegramLogo(props: VectorProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px"
         viewBox="0 0 16 16" version="1.1">
      <path class={props.pathClass || undefined}
            style="stroke:none;fill-rule:nonzero;fill-opacity:1;"
            d="M 6.277344 10.121094 L 6.011719 13.84375 C 6.390625 13.84375 6.554688 13.679688 6.753906 13.484375 L 8.527344 11.789062 L 12.207031 14.484375 C 12.882812 14.859375 13.355469 14.660156 13.539062 13.863281 L 15.953125 2.546875 C 16.167969 1.550781 15.59375 1.160156 14.9375 1.402344 L 0.742188 6.839844 C -0.226562 7.214844 -0.210938 7.753906 0.578125 8 L 4.207031 9.128906 L 12.636719 3.851562 C 13.03125 3.589844 13.394531 3.734375 13.097656 4 Z M 6.277344 10.121094 "/>
    </svg>
  )
}

