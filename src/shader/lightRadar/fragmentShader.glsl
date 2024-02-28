varying vec3 vPosition;
varying vec2 vUv;
uniform vec3 uColor;
uniform float uTime;
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
    sin(_angle),cos(_angle));
}
void main(){
    //这里是对uv坐标进行旋转
   vec2 newUv = rotate2d(uTime*6.28)* (vUv-0.5);
    newUv +=0.5;
    float alpha = 1.0 - step(0.5,distance(newUv,vec2(0.5)));
    float angle = atan(newUv.y - 0.5,newUv.x - 0.5);
    //angle的取值范围是-3.14到3.14 这里的角度越大，颜色越深
    float strangth = (angle+3.14)/6.28;
    gl_FragColor = vec4(uColor,alpha*strangth);
}