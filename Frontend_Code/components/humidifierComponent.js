// enhanced-humidifierComponent.js
function createHumidifier() {
  const humidifierGroup = new THREE.Group();
  
  // ����
  const baseGeometry = new THREE.CylinderGeometry(0.25, 0.3, 0.5, 16);
  const baseMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    roughness: 0.2,
    emissive: 0x88ccff,
    emissiveIntensity: 0
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = 0.25;
  base.castShadow = true;
  base.receiveShadow = true;
  humidifierGroup.add(base);
  humidifierGroup.baseMaterial = baseMaterial;
  
  // ����
  const topGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.3, 16);
  const topMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xe0e0e0,
    roughness: 0.3
  });
  const top = new THREE.Mesh(topGeometry, topMaterial);
  top.position.y = 0.65;
  top.castShadow = true;
  humidifierGroup.add(top);
  
  // �����
  const outletGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 16);
  const outletMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
  const outlet = new THREE.Mesh(outletGeometry, outletMaterial);
  outlet.position.y = 0.82;
  humidifierGroup.add(outlet);
  
  // �������
  const panelGeometry = new THREE.BoxGeometry(0.15, 0.1, 0.02);
  const panelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const panel = new THREE.Mesh(panelGeometry, panelMaterial);
  panel.position.set(0, 0.4, 0.26);
  humidifierGroup.add(panel);
  
  // LED��ʾ - ����������ʾ��
  const ledPanelGeometry = new THREE.PlaneGeometry(0.1, 0.05);
  const ledPanelMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x00ff88,
    transparent: true,
    opacity: 0
  });
  const ledPanel = new THREE.Mesh(ledPanelGeometry, ledPanelMaterial);
  ledPanel.position.set(0, 0.4, 0.27);
  humidifierGroup.add(ledPanel);
  humidifierGroup.ledPanelMaterial = ledPanelMaterial;
  
  // ����������ʾ
  // ����һ��canvas������ʾ��ǰ��λ
  const digitCanvas = document.createElement('canvas');
  digitCanvas.width = 64;
  digitCanvas.height = 32;
  const digitCtx = digitCanvas.getContext('2d');
  
  // ����������ʾ����
  const digitTexture = new THREE.CanvasTexture(digitCanvas);
  const digitMaterial = new THREE.MeshBasicMaterial({
    map: digitTexture,
    transparent: true,
    opacity: 0
  });
  
  // ����������ʾ����
  const digitGeometry = new THREE.PlaneGeometry(0.08, 0.04);
  const digitDisplay = new THREE.Mesh(digitGeometry, digitMaterial);
  digitDisplay.position.set(0, 0.4, 0.275);
  humidifierGroup.add(digitDisplay);
  
  // �洢����
  humidifierGroup.digitCtx = digitCtx;
  humidifierGroup.digitTexture = digitTexture;
  humidifierGroup.digitMaterial = digitMaterial;
  
  // ˮλ��ʾ��
  const waterLevelGeometry = new THREE.CylinderGeometry(0.22, 0.22, 0.4, 16, 1, true);
  const waterLevelMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x88ccff,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide
  });
  const waterLevel = new THREE.Mesh(waterLevelGeometry, waterLevelMaterial);
  waterLevel.position.y = 0.25; // ��ʼλ��
  waterLevel.scale.y = 0.2; // ��ʼˮλ�߶�Ϊ20%
  humidifierGroup.add(waterLevel);
  humidifierGroup.waterLevel = waterLevel;
  humidifierGroup.waterLevelMaterial = waterLevelMaterial;
  
  // �������� - �����������ӣ���ʼ״̬������
  const mistGroup = new THREE.Group();
  const mistCount = 30; // ������������
  for (let i = 0; i < mistCount; i++) {
    const mistGeometry = new THREE.SphereGeometry(0.02 + Math.random() * 0.04, 8, 8);
    const mistMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.4
    });
    const mist = new THREE.Mesh(mistGeometry, mistMaterial);
    
    // ����ԭʼ����������ʹ��
    mist.userData = {
      speed: 0.005 + Math.random() * 0.01,
      fadeRate: 0.98 + Math.random() * 0.01,
      originalSize: mistGeometry.parameters.radius,
      horizontalDrift: (Math.random() - 0.5) * 0.01
    };
    
    mist.position.set(
      (Math.random() - 0.5) * 0.1,
      0.85 + Math.random() * 0.1,
      (Math.random() - 0.5) * 0.1
    );
    mistGroup.add(mist);
  }
  humidifierGroup.add(mistGroup);
  humidifierGroup.mistGroup = mistGroup;
  mistGroup.visible = false;
  
  // ��ӹ���Ч��
  const glowGeometry = new THREE.SphereGeometry(0.35, 16, 16);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x88ccff,
    transparent: true,
    opacity: 0
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  glow.position.y = 0.65;
  humidifierGroup.add(glow);
  humidifierGroup.glowMaterial = glowMaterial;
  
  // �����������Ч��
  const mistRingGeometry = new THREE.TorusGeometry(0.12, 0.02, 8, 24);
  const mistRingMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0
  });
  const mistRing = new THREE.Mesh(mistRingGeometry, mistRingMaterial);
  mistRing.rotation.x = Math.PI / 2;
  mistRing.position.y = 0.85;
  humidifierGroup.add(mistRing);
  humidifierGroup.mistRing = mistRing;
  humidifierGroup.mistRingMaterial = mistRingMaterial;
  
  // ״̬����
  humidifierGroup.currentIntensity = 0.2; // Ĭ��ֵΪ1��20%
  humidifierGroup.intensityLevel = 1;     // Ĭ�ϵ�λΪ1
  humidifierGroup.isOn = false;
  humidifierGroup.animationTime = 0;
  
  // ��ǿ���Ʒ���
  humidifierGroup.setStatus = function(status) {
    this.isOn = (status === 'on');
    this.mistGroup.visible = this.isOn;
    
    // ����״̬�仯ʱ���Ӿ�Ч��
    if (this.isOn) {
      // ��LED����������ʾ
      this.ledPanelMaterial.opacity = 0.7;
      this.digitMaterial.opacity = 1.0;
      
      // ����Ѿ��е�λ���ã�ʹ�õ�ǰֵ������Ĭ��Ϊ1
      const currentLevel = this.intensityLevel || 1;
      
      // ȷ������������ʾ
      this.updateLEDDisplay(currentLevel);
      
      // ���������Ӿ�Ч��
      this.baseMaterial.emissiveIntensity = 0.2 * this.currentIntensity;
      this.glowMaterial.opacity = 0.2 * this.currentIntensity;
      this.mistRingMaterial.opacity = 0.3 * this.currentIntensity;
      this.waterLevelMaterial.opacity = 0.3 + 0.2 * this.currentIntensity;
    } else {
      // ��ȫ�ر�LED����������ʾ
      this.ledPanelMaterial.opacity = 0;
      this.digitMaterial.opacity = 0;
      
      // �ر������Ӿ�Ч��
      this.baseMaterial.emissiveIntensity = 0;
      this.glowMaterial.opacity = 0;
      this.mistRingMaterial.opacity = 0;
      this.waterLevelMaterial.opacity = 0.2;
    }
  };
  
  humidifierGroup.setIntensity = function(level) {
    // ����ԭʼǿ��ֵ��1-5��Χ��
    const originalLevel = Math.max(1, Math.min(5, level));
    this.intensityLevel = originalLevel; // ����������λֵ
    this.currentIntensity = originalLevel / 5; // ��һ����ǿ��ֵ
    
    // ����������ʾ - ���Ǹ�����ʾ�������豸�Ƿ���
    this.updateLEDDisplay(originalLevel);
    
    // ����豸�رգ�ֻ���µ�λֵ���������Ӿ�Ч��
    if (!this.isOn) return;
    
    // ����LED�����ɫ - ����ǿ�ȱ仯ɫ��
    this.ledPanelMaterial.color.setHSL(0.4 - (originalLevel-1) * 0.05, 1, 0.5);
    
    // ������������Ч��
    this.baseMaterial.emissiveIntensity = 0.2 * this.currentIntensity;
    
    // ��������Ч��
    this.glowMaterial.opacity = 0.2 * this.currentIntensity;
    
    // ����ˮλ��ʾ
    this.waterLevel.scale.y = 0.2 + this.currentIntensity * 0.6; // 20%-80%��Χ�ڱ仯
    this.waterLevelMaterial.opacity = 0.3 + 0.2 * this.currentIntensity;
    this.waterLevelMaterial.color.setHSL(0.55, 0.7, 0.5 + this.currentIntensity * 0.2);
    
    // ����������
    this.mistRingMaterial.opacity = 0.3 * this.currentIntensity;
    
    // ������Ծ��������������
    const activeMistCount = Math.floor(5 + this.currentIntensity * 25);
    this.mistGroup.children.forEach((mist, i) => {
      if (i < activeMistCount) {
        mist.visible = true;
        
        // �������Ӵ�С�Ͳ�͸����
        const scale = 0.8 + this.currentIntensity * 0.4;
        mist.scale.set(scale, scale, scale);
        
        // ������������
        mist.userData.speed = (0.005 + Math.random() * 0.005) * (0.7 + this.currentIntensity * 0.6);
        mist.userData.fadeRate = 0.98 + (1 - this.currentIntensity) * 0.01;
      } else {
        mist.visible = false;
      }
    });
    
    console.log(`��ʪ����λ�ѵ���Ϊ ${originalLevel}���Ѹ���LED��ʾ`);
  };
  
  // ����LED��ʾ���ϵ�����
  humidifierGroup.updateLEDDisplay = function(level) {
    // ȷ��level����Ч��Χ��
    const safeLevel = Math.max(1, Math.min(5, level || this.intensityLevel || 1));
    
    // ���canvas
    this.digitCtx.clearRect(0, 0, 64, 32);
    
    // ������ʽ
    this.digitCtx.fillStyle = '#000000';
    this.digitCtx.fillRect(0, 0, 64, 32);
    
    // ��������
    this.digitCtx.font = 'bold 24px Arial';
    this.digitCtx.textAlign = 'center';
    this.digitCtx.textBaseline = 'middle';
    
    // ���ݵ�λ���ò�ͬ��ɫ
    const colors = ['#00ff88', '#00e0ff', '#00c0ff', '#00a0ff', '#0080ff'];
    this.digitCtx.fillStyle = colors[safeLevel - 1] || colors[0];
    
    // ���Ƶ�λ����
    this.digitCtx.fillText(safeLevel.toString(), 32, 16);
    
    // ����豸������ȷ��������ʾ�ǿɼ���
    if (this.isOn && this.digitMaterial) {
      this.digitMaterial.opacity = 1.0;
      this.ledPanelMaterial.opacity = 0.7;
    }
    
    // ��������
    this.digitTexture.needsUpdate = true;
    
    console.log("���¼�ʪ��LED��ʾ����ǰ��λ:", safeLevel);
  };
  
  // Ϊ�˼���index�ļ��е�"level"�ֶκ�room�ļ��е�"intensity"�ֶ�
  humidifierGroup.setIntensityOrLevel = function(value) {
    // ȷ��ֵ��1-5��Χ��
    const level = Math.max(1, Math.min(5, value));
    // ����setIntensity����
    this.setIntensity(level);
    
    console.log(`ͨ�����ݷ������ü�ʪ����λΪ ${level}`);
    return level;
  };
  
  humidifierGroup.animate = function(deltaTime) {
    if (!this.isOn) return;
    
    // �����ڲ�������ʱ��
    this.animationTime += deltaTime || 0.016; // ���û���ṩdeltaTime������ԼΪ16ms��60fps��
    
    // ˮλ��΢����Ч��
    const waterScale = this.waterLevel.scale.y;
    this.waterLevel.scale.y = waterScale + Math.sin(this.animationTime * 2) * 0.005 * this.currentIntensity;
    
    // ����������Ч��
    const pulseFactor = 0.5 + Math.sin(this.animationTime * 3) * 0.2;
    this.mistRing.scale.set(
      1 + pulseFactor * 0.1 * this.currentIntensity,
      1 + pulseFactor * 0.1 * this.currentIntensity,
      1
    );
    this.mistRingMaterial.opacity = 0.3 * this.currentIntensity * pulseFactor;
    
    // �������Ӷ���
    if (this.mistGroup.visible) {
      this.mistGroup.children.forEach(mist => {
        if (!mist.visible) return;
        
        // �����ƶ�
        mist.position.y += mist.userData.speed;
        
        // ˮƽƯ��
        mist.position.x += mist.userData.horizontalDrift * this.currentIntensity;
        mist.position.z += mist.userData.horizontalDrift * this.currentIntensity * 0.8;
        
        // ����Ч��
        mist.material.opacity *= mist.userData.fadeRate;
        
        // ��΢����Ч��
        const expansionRate = 1.004 * this.currentIntensity;
        mist.scale.multiplyScalar(expansionRate);
        
        // ���ôﵽһ���߶Ȼ���ȫ͸��������
        if (mist.position.y > 1.5 || mist.material.opacity < 0.05) {
          // ����λ��
          mist.position.set(
            (Math.random() - 0.5) * 0.1 * (0.5 + this.currentIntensity * 0.8),
            0.85 + Math.random() * 0.05,
            (Math.random() - 0.5) * 0.1 * (0.5 + this.currentIntensity * 0.8)
          );
          // ���ò�͸����
          mist.material.opacity = 0.3 + Math.random() * 0.2 * this.currentIntensity;
          // ���ô�С
          const originalSize = mist.userData.originalSize;
          const scale = (0.8 + this.currentIntensity * 0.4);
          mist.scale.set(scale, scale, scale);
          // ��һ���µ�ˮƽƯ��ֵ
          mist.userData.horizontalDrift = (Math.random() - 0.5) * 0.01;
        }
      });
    }
    
    // ����Ч������΢����
    const glowPulse = 0.7 + Math.sin(this.animationTime * 1.5) * 0.3;
    this.glowMaterial.opacity = 0.15 * this.currentIntensity * glowPulse;
    this.baseMaterial.emissiveIntensity = 0.15 * this.currentIntensity * glowPulse;
  };
  
  return humidifierGroup;
}

window.createHumidifier = createHumidifier;