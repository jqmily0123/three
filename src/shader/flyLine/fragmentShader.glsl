varying float vSize;
uniform vec3 uColor;

void main(){
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5, 0.5));
    //distanceToCenter的取值范围是0.0到0.5
    //strength的取值范围是1.0到0.0
    //距离中心点越远，颜色越淡
    float strength = 1.0 - (distanceToCenter* 2.0);
    if(vSize<=0.0){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 0.0);
    }else{
        gl_FragColor = vec4(uColor, strength);
    }
}