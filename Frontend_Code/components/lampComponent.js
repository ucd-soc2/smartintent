// lampComponent.js
// ����̨�����
function createLamp() {
  const lampGroup = new THREE.Group();
  
  // ����
  const lampBaseGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.05, 16);
  const lampBaseMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
  const lampBase = new THREE.Mesh(lampBaseGeometry, lampBaseMaterial);
  lampBase.castShadow = true;
  lampGroup.add(lampBase);
  
  // �Ƹ�
  const lampPoleGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1.3, 8);
  const lampPoleMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 });
  const lampPole = new THREE.Mesh(lampPoleGeometry, lampPoleMaterial);
  lampPole.position.y = 0.65;
  lampPole.castShadow = true;
  lampGroup.add(lampPole);
  
  // ����
  const lampShadeGeometry = new THREE.ConeGeometry(0.3, 0.5, 16, 1, true);
  const lampShadeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xf9e8a0,
    emissive: 0xf9e8a0,
    emissiveIntensity: 0.5,
    side: THREE.DoubleSide
  });
  const lampShade = new THREE.Mesh(lampShadeGeometry, lampShadeMaterial);
  lampShade.position.y = 1.3;
  lampShade.rotation.x = Math.PI;
  lampShade.castShadow = true;
  lampGroup.add(lampShade);
  
  // ��ӵ��Դ�ڵ����ڲ�
  const lampLight = new THREE.PointLight(0xf9e8a0, 0.8, 5);
  lampLight.position.set(0, 1.1, 0);
  lampLight.castShadow = true;
  lampGroup.add(lampLight);
  
  // ��������õķ��ʣ��Ա����
  lampGroup.lampLight = lampLight;
  lampGroup.lampShade = lampShade;
  lampGroup.lampShadeMaterial = lampShadeMaterial;
  
  // ��ӿ��Ʒ���
  lampGroup.setStatus = function(status) {
    if(status === 'on') {
      this.lampLight.intensity = 0.8;
      this.lampShadeMaterial.emissiveIntensity = 0.5;
    } else {
      this.lampLight.intensity = 0;
      this.lampShadeMaterial.emissiveIntensity = 0;
    }
  };
  
  lampGroup.setBrightness = function(brightness) {
    // ���ȷ�Χ 1-5
    const normalizedBrightness = brightness / 5;
    this.lampLight.intensity = normalizedBrightness * 0.8;
    this.lampShadeMaterial.emissiveIntensity = normalizedBrightness * 0.5;
  };
  
  return lampGroup;
}

// �������
window.createLamp = createLamp;