
/**
 * 自定义loader，自动添加媒体查询样式，用来适配PC端
 * 当屏幕宽度过大时，将所有position为fixed的元素宽度减小，并居中显示
 * 
 */
module.exports = function (source) {

  // 若css中包含媒体查询，则不进行转换
  if (/@media/.test(source)) {
    console.log('match');
    return source;
  }

  const pattern1 = /^\s*([^{]*){[^}]*position: *fixed[^}]*}/g;
  const pattern2 = /}\s*([^{]*){[^}]*position: *fixed[^}]*}/g;

  const replacement = `$&
@media screen and (min-width: 70vh) {
  $1 {
    width: 60vh;
    left: 50%;
    margin-left: -30vh;
  }
}`;

  const temp = source.replace(pattern1, replacement);
  const result = temp.replace(pattern2, replacement);

  return result;
};