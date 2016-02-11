import fetch from 'isomorphic-fetch';
import {fromJS} from 'immutable';
import {getLang} from '../i18n/index';
import {ownAddress} from '../shared-settings'; // relative path for the sake of tests

function fetchFromApi(url, fetchOptions = null) {
  if (getLang() === undefined) {
    console.log('Language not defined while making API call');
    throw new Error('Lang not defined!');
  }
  const fullUrl = ownAddress + '/api/' + url;
  return fetch(fullUrl, fetchOptions)
    .then(response => response.json())
    .then(json => fromJS(json))
    .catch(error => {
      console.error('MIDDLEWARE ERROR:', fullUrl, error);
      throw error;
    });
}

export function voteForAnswerPromise(id) {
	console.log('voteForAnswerPromise');
  return fetchFromApi(`vote-for-answer?language=${getLang()}&answerIdentifier=${id}`, { method: 'put', credentials: 'include' });
}
export function fetchQuestionsPromise() {
  //return fetchFromApi(getLang() + '/questions.json');
   console.log('fetchQuestionsPromise');
  return fetchFromApi('questions_list/' + getLang() + '.json');
  //questions_list/ru.json
}
export function fetchAnswersPromise(path) {
  //return fetchFromApi(getLang() + '/questions/' + path + '.json');
  console.log('fetchAnswersPromise');
  return fetchFromApi('question/' + getLang() + '/' + path + '.json');
  //question/ru/48.json
}
export function fetchWorldviewsPromise() {
  //return fetchFromApi(getLang() + '/worldviews.json');
  console.log('fetchWorldviewsPromise');
  return fetchFromApi('worldviews_list/'+getLang() + '.json');
}
export function fetchWorldviewPromise(path) {
  //return fetchFromApi(getLang() + '/worldviews/' + path + '.json');
  console.log('fetchWorldviewPromise');
  return fetchFromApi('worldview/' +getLang() + '/' + path + '.json');
  //worldview/ru/46.json
}
export function fetchBlogsPromise() {
  //return fetchFromApi(getLang() + '/blogs.json');
    console.log('fetchBlogsPromise');
  return fetchFromApi('blogs_list/' + getLang() + '.json');
  //blogs_list/en.json
}
export function fetchBlogPromise(path) {
	console.log('fetchBlogPromise');
  return fetchFromApi(getLang() + '/blogs/' + path + '.json');
}
export function fetchAboutPromise() {
	console.log('fetchAboutPromise');
  //return fetchFromApi(getLang() + '/about.json');
  return fetchFromApi('about/' +getLang() +'.json');
  //about/ru.json
}
