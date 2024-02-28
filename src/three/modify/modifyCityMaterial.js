// "uniform vec3 diffuse;
// 这行声明了一个 uniform 变量 diffuse，用于表示物体的漫反射颜色。
// uniform float opacity;
// 这行声明了一个 uniform 变量 opacity，用于表示物体的透明度。
// #ifndef FLAT_SHADED
// 这是一个预处理指令，用于条件编译，表示如果未定义 FLAT_SHADED 宏，则执行以下代码块。
// varying vec3 vNormal;
// 这行声明了一个 varying 变量 vNormal，用于在顶点着色器和片元着色器之间传递顶点法线信息。通常用于光照计算。
// #endif
//
// #include <common>
// 这是一个预处理指令，用于包含一个公共的片元着色器代码块，通常包含了一些常用的函数、变量或者宏定义
// varying vec3 vPosition;
// 这行声明了一个 varying 变量 vPosition，用于在顶点着色器和片元着色器之间传递顶点位置信息。
// uniform vec3 uTopColor;
// 这行声明了一个 uniform 变量 uTopColor，用于表示自定义的顶部颜色。
// uniform float uHeight;
// 这行声明了一个 uniform 变量 uHeight，用于表示物体的高度
//
// #include <dithering_pars_fragment>
// 这是一个预处理指令，用于包含一个片元着色器代码块，用于声明抖动效果的相关变量。
// #include <color_pars_fragment>
// 这是一个预处理指令，用于包含抖动相关的片元着色器代码块，包含了抖动效果的相关参数和函数
// #include <uv_pars_fragment>
// 这是一个预处理指令，用于包含 UV 相关的片元着色器代码块，包含了 UV 坐标的计算和采样所需的参数和函数
// #include <map_pars_fragment>
// 这是一个预处理指令，用于包含贴图相关的片元着色器代码块，包含了贴图采样所需的参数和函数。
// #include <alphamap_pars_fragment>
// 包含了与 alpha 贴图相关的参数和函数。通常用于在片元着色器中处理 alpha 贴图，实现透明度的控制
// #include <alphatest_pars_fragment>
// 包含了 alpha 测试（alpha test）相关的参数和函数。alpha 测试用于在渲染过程中基于片元的 alpha 值进行丢弃或保留，以实现一些简单的透明效果
// #include <alphahash_pars_fragment>
// 包含了 alpha 哈希（alpha hash）相关的参数和函数。alpha 哈希通常用于在片元着色器中实现更复杂的透明度计算或效果
// #include <aomap_pars_fragment>
// 包含了环境光遮蔽（ambient occlusion）相关的参数和函数。环境光遮蔽用于在渲染过程中模拟光线在场景中的散射和吸收，从而增加场景的真实感
// #include <lightmap_pars_fragment>
// 包含了光照贴图（lightmap）相关的参数和函数。光照贴图通常用于存储场景中的静态光照信息，以减少实时渲染时的计算量。
// #include <envmap_common_pars_fragment>
// 包含了环境贴图（environment map）相关的参数和函数。环境贴图通常用于模拟物体表面的反射和折射效果，增加场景的真实感
// #include <envmap_pars_fragment>
// 包含了环境贴图（environment map）相关的参数和函数。环境贴图通常用于模拟物体表面的反射和折射效果，增加场景的真实感
// #include <fog_pars_fragment>
// 包含了雾效（fog）相关的参数和函数。雾效通常用于模拟远处物体的模糊效果，增加场景的真实感

// #include <specularmap_pars_fragment>
// 包含了高光贴图（specular map）相关的参数和函数。高光贴图通常用于模拟物体表面的高光效果，增加场景的真实感
// #include <logdepthbuf_pars_fragment>
// 包含了对数深度缓冲（logarithmic depth buffer）相关的参数和函数。对数深度缓冲通常用于解决透视投影中的深度精度问题
// #include <clipping_planes_pars_fragment>
// 包含了裁剪平面（clipping planes）相关的参数和函数。裁剪平面通常用于在渲染过程中对场景进行裁剪，以实现一些特殊的效果

// void main() {
//   vec4 diffuseColor = vec4( diffuse, opacity );
// 这行代码创建了一个 vec4 类型的变量 diffuseColor，它是一个四维向量，用来表示物体的漫反射颜色和不透明度。
// diffuse: 这是一个 uniform 变量，它代表了物体的漫反射颜色。漫反射颜色是在没有明确光源作用下，物体表面上呈现的基本颜色
// opacity: 这是一个 uniform 变量，它表示物体的不透明度。通常情况下，这个值会在 0（完全透明）和 1（完全不透明）之间取值，用来控制物体的透明程度。
// 综合起来，diffuseColor 变量用来存储物体的漫反射颜色和不透明度信息，将 diffuse 变量的颜色值作为 RGB 分量，将 opacity 变量的值作为 A（透明度）分量。
// 这样就得到了一个完整的颜色向量，用于在渲染过程中对物体进行着色。
//   #include <clipping_planes_fragment>
// 总之，#include <clipping_planes_fragment> 主要用于处理裁剪平面相关的渲染逻辑，确保渲染结果符合预期，并且提高渲染效率
//   #include <logdepthbuf_fragment>
// #include <logdepthbuf_fragment> 片元着色器代码片段会对当前片元的深度值进行对数变换，以保证深度精度在整个深度范围内更加均匀，从而改善远处物体的渲染效果，并减少 Z-fighting 问题的出现。
//   #include <map_fragment>

// #include <map_fragment> 是用于处理纹理映射（texture mapping）的片元着色器代码片段。纹理映射是在渲染过程中将纹理贴图应用到物体表面的过程，用于给物体增加表面细节、颜色和纹理。
//   #include <color_fragment>
// #include <color_fragment> 片元着色器代码片段用于处理物体的颜色信息，包括漫反射颜色、高光颜色、环境光遮蔽颜色、光照贴图颜色等。
//   #include <alphamap_fragment>
//   #include <alphatest_fragment>
//   #include <alphahash_fragment>
//   #include <specularmap_fragment>
//   ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
//   #ifdef USE_LIGHTMAP
//   vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
//   reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
//   #else
//   reflectedLight.indirectDiffuse += vec3( 1.0 );
//   #endif
//   #include <aomap_fragment>
//   reflectedLight.indirectDiffuse *= diffuseColor.rgb;
//   vec3 outgoingLight = reflectedLight.indirectDiffuse;
//   #include <envmap_fragment>
//   #include <opaque_fragment>
//   #include <tonemapping_fragment>
//   #include <colorspace_fragment>
//   #include <fog_fragment>
//   #include <premultiplied_alpha_fragment>
//
//   #include <dithering_fragment>
//
//   vec4 distGradColor = gl_FragColor;
//   //设置混合的百分比
//   float grabMix= (vPosition.y + uHeight / 2.0) / uHeight;
//   //计算出混合的颜色
//   vec3 grabMixColor = mix(distGradColor.xyz,uTopColor, grabMix);
//   gl_FragColor = vec4(grabMixColor,1);
//   //#end#
//
//
// }"
import * as THREE from "three";
import gsap from "gsap";

export default function modifyCityMaterial(mesh) {
  // console.log(mesh);
  //这里的onBeforeCompile是一个回调函数，用于在材质编译之前执行 可以用来修改着色器程序。
  mesh.material.onBeforeCompile = (shader) => {
    // console.log(shader);
    //下面的代码的作用是在片元着色器中移除抖动效果
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `
          #include <dithering_fragment>
          //#end#
        `,
    );
    addGrabColor(shader, mesh);
    addSpread(shader, new THREE.Vector2(0, 0));
    addLightLine(shader);
    addTopLine(shader);
  };
}
// addGrabColor的作用是在片元着色器中添加一个效果，根据物体的高度差，计算出一个混合的百分比越高的地方，颜色越接近顶部颜色
export function addGrabColor(shader, mesh) {
  // 这一行计算了网格对象的边界框，以便获取物体的最小和最大顶点。
  mesh.geometry.computeBoundingBox();
  const { min, max } = mesh.geometry.boundingBox;
  //获取物体的高度差
  let uHeight = max.y - min.y;
  //添加uniform变量
  shader.uniforms.uTopColor = { value: new THREE.Color(0x000000) };
  shader.uniforms.uHeight = {
    value: uHeight,
  };
  // 修改顶点着色器
  //这里的代码的作用是在顶点着色器中添加一个varying变量vPosition，用于在顶点着色器和片元着色器之间传递顶点位置信息。
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
        #include <common>
        varying vec3 vPosition;
    `,
  );
  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
        #include <begin_vertex>
        vPosition = position;
    `,
  );
  // 修改片元着色器
  //这里代码的主要作用就是
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
        #include <common>
        varying vec3 vPosition;
        uniform vec3 uTopColor;
        uniform float uHeight;
        `,
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
        vec4 distGradColor = gl_FragColor;
        //实现的效果是根据物体的高度差，计算出一个混合的百分比越高的地方，颜色越接近顶部颜色
        //这里的uHeight/4.0表示的是物体的高度差的四分之一 也就是说物体的高度差越大，混合的因子越大
        float grabMix= (vPosition.y + uHeight / 2.0) / uHeight;
        //计算出混合的颜色
        //按道理来讲 这里的y轴越大这的混合因子越大，颜色越接近顶部颜色
        vec3 grabMixColor = mix(distGradColor.xyz,uTopColor, grabMix);
        gl_FragColor = vec4(grabMixColor,1);
        //#end#  
      `,
  );
}
//添加建筑材质的光波效果
export function addSpread(shader, center = new THREE.Vector2(0, 0)) {
  //设置扩散的中心点
  shader.uniforms.uSpreadCenter = { value: center };
  //设置扩散的时间
  shader.uniforms.uSpreadTime = { value: 0 };
  //设置条带的宽度
  shader.uniforms.uSpreadWidth = { value: 40 };
  //修改片元着色器
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
        #include <common>
        uniform vec2 uSpreadCenter;
        uniform float uSpreadTime;
        uniform float uSpreadWidth;
        `,
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
    // 这里spreadRadius的取值范围是0到uSpreadTime
    float spreadRadius = distance(vPosition.xz, uSpreadCenter);
    //这个函数的逻辑是，当spreadRadius小于uSpreadTime时，返回0，当spreadRadius大于uSpreadTime时，返回spreadRadius-uSpreadTime的平方
    // -(spreadRadius - uSpreadTime表示在扩散中心内部，spreadRadius - uSpreadTime的值为负数，这样就可以实现扩散中心内部的颜色不变
    float spreadIndex = -(spreadRadius - uSpreadTime)*(spreadRadius - uSpreadTime)+uSpreadWidth;
    if(spreadIndex>2.0){
      gl_FragColor = mix(gl_FragColor,vec4(1,1,1,1),spreadIndex/uSpreadWidth);
    }
    //#end#
  `,
  );
  gsap.to(shader.uniforms.uSpreadTime, {
    value: 800,
    duration: 5,
    repeat: -1,
    // yoyo: true,
    ease: "none",
  });
}

export function addLightLine(shader) {
  shader.uniforms.uLightLineTime = {
    value: -1500,
  };
  //设置条带的宽度
  shader.uniforms.uLightLineWidth = { value: 100 };
  //修改片元着色器
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
        #include <common>
        uniform float uLightLineTime;
        uniform float uLightLineWidth;
        `,
  );
  //这里对于shader的修改不会影响到其他的shader是因为 对于gl_FragColor = mix(gl_FragColor,vec4(0.8,1.0,1.0,1),LightLightMix/uLightLineWidth);
  //的修改是在if语句中的，所以不会影响到其他的shader
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
      float LightLightMix = -(vPosition.x+vPosition.z-uLightLineTime)*(vPosition.x+vPosition.z-uLightLineTime)+uLightLineWidth;
      if(LightLightMix>0.0){
        gl_FragColor = mix(gl_FragColor,vec4(0.8,1.0,1.0,1),LightLightMix/uLightLineWidth);
      }
    //#end#
    `,
  );
  gsap.to(shader.uniforms.uLightLineTime, {
    value: 1000,
    duration: 5,
    repeat: -1,
    ease: "none",
  });
}

export function addTopLine(shader) {
  // console.log(123);
  shader.uniforms.uToTopTime = {
    value: 0,
  };
  //设置条带的宽度
  shader.uniforms.uToTopWidth = { value: 40 };
  //修改片元着色器
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
        #include <common>
        uniform float uToTopTime;
        uniform float  uToTopWidth;
        `,
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
      float toTopMix = -(vPosition.y-uToTopTime)*(vPosition.y-uToTopTime)+uToTopWidth;
      if(toTopMix>0.0){
        gl_FragColor = mix(gl_FragColor,vec4(0.8,1.0,1.0,1),toTopMix/uToTopWidth);
      }
    //#end#
    `,
  );
  gsap.to(shader.uniforms.uToTopTime, {
    value: 300,
    duration: 5,
    repeat: -1,
    ease: "none",
  });
}
