// tvComponent.js
// �����������
function createTV() {
  const tvGroup = new THREE.Group();
  
  // ��ӵ��ӹ�
  const tvStandGeometry = new THREE.BoxGeometry(2, 0.8, 1.2);
  const tvStandMaterial = new THREE.MeshStandardMaterial({ color: 0xd2bc94 });
  const tvStand = new THREE.Mesh(tvStandGeometry, tvStandMaterial);
  tvStand.position.set(0, 0.4, 0);
  tvStand.castShadow = true;
  tvStand.receiveShadow = true;
  tvGroup.add(tvStand);
  
  // ���ӹ�͵���֮���֧��
  const tvPillarGroup = new THREE.Group();
  
  // ��֧��
  const pillarGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);
  const pillarMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
  const mainPillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
  mainPillar.position.set(0, 0.5, 0);
  mainPillar.castShadow = true;
  tvPillarGroup.add(mainPillar);
  
  // װ�λ�1 - �ײ�
  const ring1Geometry = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 16);
  const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xd4af37 }); // ��ɫ
  const ring1 = new THREE.Mesh(ring1Geometry, ringMaterial);
  ring1.position.set(0, 0.05, 0);
  tvPillarGroup.add(ring1);
  
  // װ�λ�2 - ����
  const ring2Geometry = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 16);
  const ring2 = new THREE.Mesh(ring2Geometry, ringMaterial);
  ring2.position.set(0, 0.95, 0);
  tvPillarGroup.add(ring2);
  
  // ����
  const baseGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.05, 16);
  const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.set(0, 0, 0);
  tvPillarGroup.add(base);
  
  // λ�õ��� - ���ڵ��ӹ��Ϸ�����λ��
  tvPillarGroup.position.set(0, 0.8, 0);
  tvGroup.add(tvPillarGroup);
  
  // ��ӵ���
  const tvGeometry = new THREE.BoxGeometry(2.5, 1.5, 0.15);
  const tvMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x111111,
    roughness: 0.2
  });
  const tv = new THREE.Mesh(tvGeometry, tvMaterial);
  tv.position.set(0, 1.8, 0);
  tv.castShadow = true;
  tv.receiveShadow = true;
  tvGroup.add(tv);
  
  // ��ӵ�����Ļ
  const screenGeometry = new THREE.PlaneGeometry(2.3, 1.3);
  const screenMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 1
  });
  screenMaterial.color.setHSL(Math.random(), 0.8, 0.5);
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.set(0, 0, 0.08);
  tv.add(screen);
  
  // ������Ҫ�ⲿ���ƵĶ���
  tvGroup.screen = screen;
  tvGroup.screenMaterial = screenMaterial;
  
  // ��ӿ��Ʒ���
  tvGroup.setStatus = function(status) {
    if(status === 'on') {
      screen.visible = true;
    } else {
      screen.visible = false;
    }
  };
  
  tvGroup.setChannel = function(channel) {
    // ����Ƶ���ı���Ļ��ɫ
    screenMaterial.color.setHSL((channel % 20) / 20, 0.8, 0.5);
  };
  
  return tvGroup;
}

// �������
window.createTV = createTV;