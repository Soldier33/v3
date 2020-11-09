import request from '/@/utils/request'

export function getOption() {
  return request({
    url: '/api/class/teach',
    method: 'get',
  })
}

export function getSubject(classId) {
  return request({
    url: '/api/teacher/teach/subject',
    method: 'get',
    params: {
      classId,
    }
  })
}

export function getStu(week, classId) {
  return request({
    url: `/api/integral/school/week/${week}/class/${classId}`,
    method: 'get',
  })
}

export function getEvaluate() {
  return request({
    url: '/api/content/template/subject/',
    method: 'get',
  })
}

export function getTest() {
  return request({
    url: '/test/gettest',
    method: 'get',
  })
}