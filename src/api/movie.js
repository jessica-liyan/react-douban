import axios from 'axios'

const getData = function(url){
  return axios({
    method: 'get',
    url: url,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

const postData = function (url) {
  return axios({
    method: 'post',
    url: url,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

// 电影正在热映
export function getMovieInTheater (city, start = 0, count = 20) {
  return getData(`movie/in_theaters?city=${city}&start=${start}&count=${count}`)
}

// 即将上线
export function getMovieInComing (start = 0, count = 20) {
  return getData(`movie/coming_soon?start=${start}&count=${count}`)
}

// 电影详情
export function getMovieDetail (id) {
  return getData(`movie/${id}`)
}

// 电影搜索
export function searchMovie (q, start = 0, count = 20) {
  return getData(`movie/search?q=${q}&start=${start}&count=${count}`)
}