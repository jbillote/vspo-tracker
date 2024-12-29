class YouTubeService {
    static async getYouTubeID(streamer: string): Promise<string> {
        const streamersList = await this.streamers()
        return streamersList['streamers'].find((member: any) => member['name'].toLowerCase() === streamer)['youtube'].toString()
    }

    private static async streamers() {
        return await Bun.file('./channels.json').json()
    }
}

export { YouTubeService }
