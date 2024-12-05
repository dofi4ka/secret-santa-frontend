export default function (props: {title?: string}) {
  return (
    <div class="relative mt-6 mb-4">
      <div class="ml-4 *:bg-white h-6 *:px-2 text-amber-800 font-medium">
        {props.title ? <span>{props.title}</span> : <></>}
      </div>
      <div class="absolute left-0 top-1/2 border-2 border-t-amber-300 w-full -z-10" />
    </div>
  )
}