import request from '/@/utils/request'

export function getData(data) {
  return request({
    url: `/api/teacher/all`,
    method: 'get',
    params: {
        pindex: data.pindex,
        number: data.number,
        teacherName: data.keyword,
    }
  })
}

export function add(data) {
  return request({
    url: '/api/teacher/add',
    method: 'POST',
    params: {
      teacherName: data.teacherName,
      idcard: data.idcard,
      teacherPhone: data.teacherPhone,
      offer: data.offer,
      jobTitle: data.jobTitle,
    }
  })
}

export function modify(data) {
  return request({
    url: `/api/teacher/${data.teacherId}/modify`,
    method: 'POST',
    params: {
      teacherId: data.teacherId,
      teacherName: data.teacherName,
      teacherPhone: data.teacherPhone,
      offer: data.offer,
      jobTitle: data.jobTitle,
      idcard: data.idcard,
    }
  })
}

export function delectTeacher(data) {
  return request({
    url: `/api/teacher/${data.teacherId}/delete`,
    method: 'POST',
    params: {
      teacherId: data.teacherId,
    }
  })
}