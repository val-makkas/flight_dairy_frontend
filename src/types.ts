export interface Entries {
    id: string,
    date: string,
    visibility: string,
    weather: string,
    comment: string
}

export type newEntry = Omit<Entries, 'id'>

export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
}
  
export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
}

export interface DiaryFormProps {
    addDiaryEntry: (entry: Entries) => void;
}