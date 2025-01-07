export type GetProfileRequestType = {
    userId: string;
};


export type GetProfileSuccessType = {
    progress: {
        level: number;
        completion: string;
    }
}