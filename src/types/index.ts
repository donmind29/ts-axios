// 作为项目中所有的公共类型文件
export type Method = 'get' | 'GET' | 'post' | 'POST' | 'delete' | 'DELETE' | 
'head' | 'HEAD' | 
'put' | 'PUT' | 
'options' | 'OPTIONS' | 
'patch' | 'PATCH'

//请求参数对象
export  interface AxiosRequestConfig{
  url: string
  method?: Method   //约束method只能传入定义好的请求方法
  data?: any
  params?: any
}