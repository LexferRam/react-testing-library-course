const mockResponse = {
    data: {
        results: [
            {
                name: {
                    first: "Laith",
                    last: "Harb"
                },
                picture: {
                    large: "https://randomuser.me/api/portraits/men/59.jpg"
                },
                login: {
                    username: "ThePhonyGOAT"
                }
            },
            {
                name: {
                    first: "Lexfer",
                    last: "Ramirez"
                },
                picture: {
                    large: "https://randomuser.me/api/portraits/men/58.jpg"
                },
                login: {
                    username: "LexferRam"
                }
            }
        ]
    }
}


export default {
    get: jest.fn().mockResolvedValue(mockResponse)
}