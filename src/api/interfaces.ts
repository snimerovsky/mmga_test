import {
    AccountType,
    Sex,
} from '../app/modules/landing-home/ProfileRegistrationForm';

export interface Subject {
    ID: number;
    Name: string;
}

export interface InstagramAccount {
    id: number;
    user_id: number;
    login: string;
    email: string;
    username: string;
    profile_picture: string;
    instagram_id: string;
    // кол-во подписчиков
    subscribers: number;
    // ранг/уроверь в нашей системе
    rang: number;
    // реферал, кто пригласил пользователя
    parent_id: number;
    // уникальная ссылка
    referrer: string;
    // заполнена форма регистрации инстаграм аккаунта
    account_filled: boolean;
    // заапрувлен админом
    approved: boolean;

    balance: number;

    // количество предупреждений
    warnings: number;

    // прошел первое обязательное задание
    first_task_completed: boolean;
}

export class InstagramTasks {
    id: number;
    tasks: InstagramTask[] | undefined;

    getTasks(): InstagramTask[] {
        if (this.tasks) {
            return this.tasks;
        }
        return [];
    }
    constructor(id: number, tasks: InstagramTask[]) {
        this.id = id;
        this.tasks = tasks;
    }
}

export interface InstagramTask {
    id: number;
    type: string;
    image: string;
    url: string;
}

export interface InstagramForm {
    profile_url: string | null;
    id: number;
    // тип акканта, личный 1, бизнес 2
    account_type: AccountType;
    // 1-3 включительно тематики, о которых мой аккаунт
    my_account_subjects: number[];

    my_sex: Sex;
    // 3 тематики, на которые мне интересно подписаться
    i_interested_in_subjects: number[];

    i_interested_in_sex: Sex;
    city: string;
}

export interface IPlan {
    id: number,
    type: string;
    months: number;
    guarantee: any;
    tokens: { amount: number, price: number }
}
