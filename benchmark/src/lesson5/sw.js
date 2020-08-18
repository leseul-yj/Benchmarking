// 不可以访问dom localStorage等等对象
// 可以用self 
// 生命周期有三个 install activited fetch
self.addEventListener('install',event => {
  console.log('install',event)
});
self.addEventListener('activate',event => {
  console.log('activate',event)
});
self.addEventListener('fetch',event => {
  console.log('fetch',event)
});