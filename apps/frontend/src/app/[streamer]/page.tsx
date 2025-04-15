// import './globals.css'

export default function Page({ params }: { params: { streamer: string } }) {
    return (
        <h1 className="flex flex-row min-h-screen justify-center items-center text-4xl">
            {decodeURIComponent(params.streamer)}
        </h1>
    )
}
