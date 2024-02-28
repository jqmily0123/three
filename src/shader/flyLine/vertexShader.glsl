attribute float aSize;
//aSize的取值范围是0-1000
uniform float uTime;
//uniform float uColor;
uniform float uLength;
varying float vSize;

void main(){
    vec4 viewPosition =  viewMatrix * modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    //随着时间的增加vSize的值会越来越小

    vSize = aSize - uTime;
    //uTime的取值范围是0-1000
    //vSize的取值范围是-1000-1000
    //下面这段代码的作用是 即使是vSize随着时间的变化变小了但是还是会显示只不过还是会越来越小
    if(vSize< 0.0){
        vSize = vSize + uLength;
    }

    vSize = (vSize-500.0)*0.1;
    //这里的viewPosition是朝向屏幕内部的，所以z值是负的 z值越小，点的大小越大
    gl_PointSize = -vSize/viewPosition.z;
}
