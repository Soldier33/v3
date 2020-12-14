import request from '/@/utils/request'

export function getData(data) {
  return request({
    url: `/api/class/all`,
    method: 'get',
    params: {
      pindex: data.pindex,
      number: data.number,
      gradeId: data.gradeId,
    }
  })
}

export function getOption() {
  return request({
    url: '/api/class/all',
    method: 'get',
  })
}

export function add(data) {
  return request({
    url: '/api/class/add',
    method: 'POST',
    params: {
      gradeId: data.gradeId,
      cid: data.classId,
      className: data.className,
    }
  })
}

export function modify(data) {
  return request({
    url: `/api/class/${data.classId}/modify`,
    method: 'POST',
    params: {
      className: data.class,
    }
  })
}


export function delectClass(data) {
  return request({
    url: `/api/class/${data.classId}/delete`,
    method: 'POST',
    params: {
      classId: data.classId,
    }
  })
}