export default async function Page({ params }: { params: Promise<{ streamer: string }> }) {
    const { streamer } = await params

    return (
        <h1 className="flex flex-row min-h-screen justify-center items-center text-4xl">
            {decodeURIComponent(streamer)}
        </h1>
    )
}
