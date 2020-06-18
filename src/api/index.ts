import axios, { AxiosResponse } from 'axios';
import {
    InstagramAccount,
    InstagramForm,
    InstagramTasks,
    Subject,
} from './interfaces';

const endpoint = () => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return '/api/v1';
        default:
            return 'https://api.mmga.ru/api/v1/';
    }
};

export const BASE_URL = endpoint();

const client = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

//test

export class Api {
    public registerHidden = (params: { email: string; password: string }) => {
        return client.post('/register-hidden', params);
    };

    public register = async (params: {
        email: string;
        password: string;
        referrer: string;
        phone: string;
        login: string;
    }) => {
        return client.post('/register', params);
    };

    public login = (params: { email: string; password: string }) => {
        return client.post('/login', params);
    };

    public pay = (params: {
        tariff_id: number;
        amount: number;
        price: number;
    }) => {
        return client.post('/pay', params);
    };

    public getOwnProfile = () => {
        return client.post('/me');
    };

    public getSubjects(): Promise<AxiosResponse<Subject[]>> {
        return client.get('/subjects');
    }

    public getInstagramAuthRedirectUrl(): string {
        return 'http://api.mmga.ru/api/v1/instagram/auth';
    }

    public myProfile(): Promise<AxiosResponse<InstagramAccount>> {
        return client.get('/me');
    }

    public logout(): Promise<AxiosResponse<InstagramAccount>> {
        return client.post('/logout');
    }

    public profileForm = (params: InstagramForm) => {
        return client.post('/fill-instagram-form', params);
    };

    public getTasks = () => {
        return client.get(`/instagram/tasks/current`);
    };

    public completeTasks = (id: any, params: any) => {
        return client.post(`/instagram/tasks/complete/${id}`, params);
    };

    public getTeam = () => {
        return client.get(`/me/team`);
    };

    public sendInfoConfirmation = (data: any) => {
        return client.post(`/me/confirm/email`, data);
    };

    public getInitialAssignments = (params: {
        instAccId: number;
    }): Promise<InstagramTasks> => {
        return client.get(`/instagram/tasks/current`).then((rs) => {
            return new InstagramTasks(rs.data.id, rs.data.tasks);
        });
    };
}

export const api = new Api();
