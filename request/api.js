import service from './index';

export const apiRegister = state => service.post('/api/register', state);
export const apiLogin = state => service.post('/api/login', state);
export const apiChangePwd = state => service.post('/api/changepwd', state);

export const apiCreateShare = shared => service.post('/api/createshare', shared);
export const apiGetShared = shared => service.get('/api/getshared', shared);

export const apiGetPaper = paper => service.post('/api/addquestion', paper);

export const apiAddQuestion = ques => service.post('/api/addquestion', ques);
export const apiGetQuestion = ques => service.post('/api/getquestion', ques);
export const apiChangeQuestion = ques => service.post('/api/changequestion', ques);
export const apiDelQuestion = ques => service.post('/api/delquestion', ques);

export const apiAddAnswer = ans => service.post('/api/addanswer', ans);
export const apiGetAnswer = ans => service.post('/api/getanswer', ans);
export const apiChangeAnswer = ans => service.post('/api/changeanswer', ans);
export const apiDelAnswer = ans => service.post('/api/delanswer', ans);


