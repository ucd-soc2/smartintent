// enhanced-curtainsComponent.js
function createCurtains() {
  const windowGroup = new THREE.Group();

  // ?�㧢���ק�
  const curtainRodGeometry = new THREE.CylinderGeometry(0.04, 0.04, 3.2, 16);
  const curtainRodMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xbaa277,
    metalness: 0.7,
    roughness: 0.2
  });
  const curtainRod = new THREE.Mesh(curtainRodGeometry, curtainRodMaterial);
  curtainRod.rotation.z = Math.PI / 2;
  curtainRod.position.y = 1.2;
  curtainRod.position.z = 0.3;
  curtainRod.castShadow = true;
  windowGroup.add(curtainRod);

  // ����?��?�㧢���ק�����?��?�����㧬��?��
  const rodCenterGeometry = new THREE.SphereGeometry(0.06, 16, 16);
  const rodCenterMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.9,
    roughness: 0.1
  });
  const rodCenter = new THREE.Mesh(rodCenterGeometry, rodCenterMaterial);
  rodCenter.position.set(0, 1.2, 0.2);
  windowGroup.add(rodCenter);

  // ?�㧢���ק���??�����㧬������ - �ק�??����?������?��
  const rodEndGeometry = new THREE.Group();

  // ?��??���䧮��
  const endSphereGeometry = new THREE.SphereGeometry(0.07, 24, 24);
  const rodEndMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xd4af37, 
    metalness: 0.9,
    roughness: 0.1
  });
  const endSphere = new THREE.Mesh(endSphereGeometry, rodEndMaterial);
  rodEndGeometry.add(endSphere);

  // ����?�����㧬������?��
  const endDetailGeometry = new THREE.TorusGeometry(0.03, 0.01, 12, 24);
  const endDetailMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 0.95,
    roughness: 0.05
  });
  const endDetail = new THREE.Mesh(endDetailGeometry, endDetailMaterial);
  endDetail.rotation.x = Math.PI / 2;
  endDetail.position.y = 0.03;
  rodEndGeometry.add(endDetail);

  const endDetail2 = endDetail.clone();
  endDetail2.position.y = -0.03;
  rodEndGeometry.add(endDetail2);

  // ?�㧢���ק�����?�����㧬��
  const rodEndLeft = rodEndGeometry.clone();
  rodEndLeft.position.set(-1.6, 1.2, 0.3);
  windowGroup.add(rodEndLeft);

  // ?�㧢���ק�����?�����㧬��
  const rodEndRight = rodEndGeometry.clone();
  rodEndRight.position.set(1.6, 1.2, 0.3);
  windowGroup.add(rodEndRight);

  // ?�㧢������?�� - ����?��
  const bracketGeometry = new THREE.Group();

  // ?��??����?��
  const bracketBaseGeometry = new THREE.BoxGeometry(0.08, 0.15, 0.06);
  const bracketMaterial = new THREE.MeshStandardMaterial({
    color: 0xbaa277,
    metalness: 0.6,
    roughness: 0.3
  });
  const bracketBase = new THREE.Mesh(bracketBaseGeometry, bracketMaterial);
  bracketGeometry.add(bracketBase);

  // ����?����??���ק�
  const bracketRodGeometry = new THREE.BoxGeometry(0.05, 0.08, 0.2);
  const bracketRod = new THREE.Mesh(bracketRodGeometry, bracketMaterial);
  bracketRod.position.z = 0.13;
  bracketGeometry.add(bracketRod);

  // ���㧬������?��
  const screwGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.08, 8);
  const screwMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.8,
    roughness: 0.2
  });
  const screw1 = new THREE.Mesh(screwGeometry, screwMaterial);
  screw1.rotation.x = Math.PI / 2;
  screw1.position.set(0, 0.05, -0.01);
  bracketGeometry.add(screw1);

  const screw2 = screw1.clone();
  screw2.position.set(0, -0.05, -0.01);
  bracketGeometry.add(screw2);

  // ����?�ѧ���?��
  const leftBracket = bracketGeometry.clone();
  leftBracket.position.set(-1.3, 1.2, 0);
  windowGroup.add(leftBracket);

  // ����?�ѧ���?��
  const rightBracket = bracketGeometry.clone();
  rightBracket.position.set(1.3, 1.2, 0);
  windowGroup.add(rightBracket);

  // ???��?��������?���
  const curtainPattern = document.createElement('canvas');
  curtainPattern.width = 256;
  curtainPattern.height = 256;
  const ctx = curtainPattern.getContext('2d');

  // ����?��?����?
  ctx.fillStyle = '#5a8eaa';  // ?��??��?��?
  ctx.fillRect(0, 0, 256, 256);

  // ����?��?��������?���
  ctx.strokeStyle = '#7aa5c0';  // ������?��?��??��?����?��?
  ctx.lineWidth = 3;

  // ���째�����짱��?������
  for (let x = 16; x < 256; x += 48) {
    ctx.beginPath();
    for (let y = 0; y < 256; y += 4) {
      const offset = Math.sin(y * 0.05) * 8;
      if (y === 0) {
        ctx.moveTo(x + offset, y);
      } else {
        ctx.lineTo(x + offset, y);
      }
    }
    ctx.stroke();
  }

  // ��?��??������
  for (let y = 24; y < 256; y += 48) {
    ctx.beginPath();
    for (let x = 0; x < 256; x += 4) {
      const offset = Math.sin(x * 0.05) * 4;
      if (x === 0) {
        ctx.moveTo(x, y + offset);
      } else {
        ctx.lineTo(x, y + offset);
      }
    }
    ctx.stroke();
  }

  // ����?����?��?���㧬����??��
  ctx.fillStyle = '#b8d0e0';  // ����??��??����?��?
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const size = Math.random() * 3 + 1;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // ???����������
  const curtainTexture = new THREE.CanvasTexture(curtainPattern);
  curtainTexture.wrapS = THREE.RepeatWrapping;
  curtainTexture.wrapT = THREE.RepeatWrapping;
  curtainTexture.repeat.set(3, 3);

  // ?�㧢��?������ - ???��?�ѧ���������?���է���
  const curtainMaterials = {
    default: new THREE.MeshStandardMaterial({ 
      color: 0x5a8eaa,
      side: THREE.DoubleSide,
      roughness: 0.7,
      metalness: 0.1,
      map: curtainTexture,
      bumpMap: curtainTexture,
      bumpScale: 0.05
    }),
    nightMode: new THREE.MeshStandardMaterial({ 
      color: 0x263949, // ���ৡ?��?
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.1,
      map: curtainTexture,
      bumpMap: curtainTexture,
      bumpScale: 0.02
    })
  };

  // ?�����㧬����?��?������
  const curtainMaterial = curtainMaterials.default.clone();
  
  // ��??��?���������է��֡�??�姲�ꧬ����
  windowGroup.curtainMaterials = curtainMaterials;
  windowGroup.currentMaterial = curtainMaterial;

  // ???��?�㧢��?��
  function createFancyCurtainRing() {
    const ringGroup = new THREE.Group();
    
    // ����?��
    const mainRingGeometry = new THREE.TorusGeometry(0.06, 0.012, 16, 32);
    const ringMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xd4d4d4,
      metalness: 0.8,
      roughness: 0.2
    });
    const mainRing = new THREE.Mesh(mainRingGeometry, ringMaterial);
    ringGroup.add(mainRing);
    
    // ���㧬��?��
    const decorRingGeometry = new THREE.TorusGeometry(0.07, 0.005, 12, 24);
    const decorRingMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.1
    });
    const decorRing = new THREE.Mesh(decorRingGeometry, decorRingMaterial);
    ringGroup.add(decorRing);
    
    return ringGroup;
  }

  // ???��?�㧢������ק� - ??����???��??�㧻��������?��?��?��
  function createDrapedCurtainMesh(width, height, segmentsX, segmentsY, foldCount, foldAmplitude) {
    const planeGeo = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
    
    // ��??�ا�?��?��?����������?��������??��?�ק��
    planeGeo.userData = {
      originalPositions: Array.from(planeGeo.attributes.position.array)
    };
    
    const mesh = new THREE.Mesh(planeGeo, curtainMaterial);
    
    // ����?���ק����?����
    mesh.updateDrape = function(openPercentage, extraFolds = 0) {
      const pos = this.geometry.attributes.position;
      const origPos = this.geometry.userData.originalPositions;
      
      // ?�駷��������?������
      const adjustedFolds = foldCount + extraFolds;
      const adjustedAmplitude = foldAmplitude * (1 + (1 - openPercentage/100) * 1.5);
      
      for (let i = 0; i < pos.count; i++) {
        const idx = i * 3;
        let x = origPos[idx];
        let y = origPos[idx + 1];
        
        const width = this.geometry.parameters.width;
        const height = this.geometry.parameters.height;
        
        const normalizedX = (x + width/2) / width;
        const normalizedY = (y + height/2) / height;
        
        // ????����?�㧢��?��?����??��
        const topConnection = normalizedY > 0.9 ? 
          Math.abs(Math.sin(normalizedX * Math.PI * adjustedFolds)) * 0.1 : 0;
        
        // ������??��������
        const hangEffect = 0.25 * Math.pow(1 - normalizedY, 2);
        
        // ?�������� - �ק�?��???���㧻��������?�駷��
        const foldEffect = Math.sin(normalizedX * Math.PI * adjustedFolds) * 
          adjustedAmplitude * (0.5 + 0.5 * (1 - normalizedY)) * 
          (0.5 + 0.5 * (1 - openPercentage/100));
        
        // ��?�������?��??������������
        const detailFolds = Math.sin(normalizedX * Math.PI * adjustedFolds * 3) * 
          adjustedAmplitude * 0.2 * (0.3 + 0.7 * (1 - normalizedY));
        
        // ������??�ߧ���
        const edgeCurl = (normalizedX < 0.1 || normalizedX > 0.9) ? 
          0.05 * Math.sin(normalizedY * Math.PI) : 0;
        
        // ?�㧢����???������ - �ק�?����?����?������
        let swayEffect = 0;
        if (windowGroup.swayEnabled && windowGroup.swayTime) {
          swayEffect = Math.sin(windowGroup.swayTime * 1.5 + normalizedY * 5) * 
            0.02 * (1 - normalizedY) * openPercentage / 100;
        }
        
        // ����?�����맵��������
        pos.setZ(i, origPos[idx + 2] + foldEffect + detailFolds - hangEffect + topConnection + edgeCurl + swayEffect);
        
        // ���ҧ�??��?��?������??
        const widthVariation = Math.sin(normalizedY * Math.PI * 4) * width * 0.02;
        pos.setX(i, x + widthVariation);
      }
      
      pos.needsUpdate = true;
      this.geometry.computeVertexNormals();
    };
    
    return mesh;
  }

  // ����?�����姵��?�㧢��
  const leftCurtain = createDrapedCurtainMesh(1.2, 2.4, 30, 30, 6, 0.12);
  leftCurtain.position.set(-0.7, -0.05, 0.25);
  leftCurtain.castShadow = true;
  leftCurtain.receiveShadow = true;
  windowGroup.add(leftCurtain);
  windowGroup.leftCurtain = leftCurtain;

  const rightCurtain = createDrapedCurtainMesh(1.2, 2.4, 30, 30, 6, 0.12);
  rightCurtain.position.set(0.7, -0.05, 0.25);
  rightCurtain.castShadow = true;
  rightCurtain.receiveShadow = true;
  windowGroup.add(rightCurtain);
  windowGroup.rightCurtain = rightCurtain;

  // ???��?�㧢��?��
  function createFancyCurtainRings(startX, y, z, count, spacing) {
    const rings = [];
    for (let i = 0; i < count; i++) {
      const ring = createFancyCurtainRing();
      ring.rotation.x = Math.PI / 2;
      ring.position.set(startX + i * spacing, y, z);
      windowGroup.add(ring);
      rings.push(ring);
    }
    return rings;
  }

  // ???��?�㧢��?��
  const leftRings = createFancyCurtainRings(-1.25, 1.2, 0.2, 10, 0.14);
  const rightRings = createFancyCurtainRings(0.31, 1.2, 0.2, 10, 0.14);
  windowGroup.leftRings = leftRings;
  windowGroup.rightRings = rightRings;
  
  // ����?��?��??��ӧ������觩??�㧢��������
  const curtainLight = new THREE.PointLight(0xffffcc, 0.5, 3);
  curtainLight.position.set(0, 1, 1);
  curtainLight.castShadow = true;
  windowGroup.add(curtainLight);
  windowGroup.curtainLight = curtainLight;
  
  // ����?��?��?��?��?����ӧ���
  const windowLight = new THREE.RectAreaLight(0xffffee, 0.5, 2.5, 2.0);
  windowLight.position.set(0, 0.5, -0.1);
  windowLight.lookAt(0, 0.5, 1);
  windowGroup.add(windowLight);
  windowGroup.windowLight = windowLight;
  
  // ?�㧯�ӡ�??�� - ?��???����?���ާ�����
  const skyGeometry = new THREE.PlaneGeometry(3, 2.2);
  const skyMaterial = new THREE.MeshBasicMaterial({
    color: 0x87ceeb,  // ����?����?
    side: THREE.DoubleSide
  });
  const skyPlane = new THREE.Mesh(skyGeometry, skyMaterial);
  skyPlane.position.set(0, 0.5, -0.1);
  windowGroup.add(skyPlane);
  windowGroup.skyPlane = skyPlane;
  windowGroup.skyMaterial = skyMaterial;
  
  // ��?��?���է�?
  windowGroup.currentOpenPercentage = 100;
  windowGroup.isOn = false;
  windowGroup.swayTime = 0;
  windowGroup.swayEnabled = false;
  
  // ���觩??��?��������?����
  windowGroup.setOpenPercentage = function(percentage) {
    // �㧻����������?���� 0-100
    const normalizedPercentage = Math.max(0, Math.min(100, percentage)) / 100;
    this.currentOpenPercentage = percentage;
    
    // �ק��?�㧢����?����??�ק�?��???��?��?��??��??�駷��
    const maxOffset = 0.9;
    const offset = (1 - normalizedPercentage) * maxOffset;
    
    // ?�駷��?�㧢�����姵����?����
    this.leftCurtain.position.x = -0.7 - offset;
    this.rightCurtain.position.x = 0.7 + offset;
    
    // ??��?�ק��������� - ?��?�㧢����������������?���������
    const extraFolds = (1 - normalizedPercentage) * 3;
    this.leftCurtain.updateDrape(percentage, extraFolds);
    this.rightCurtain.updateDrape(percentage, extraFolds);
    
    // ?�駷��?�㧢��?����?����
    leftRings.forEach((ring, i) => {
      const baseX = -1.25;
      const spacing = 0.14;
      const ringOffset = offset * (i / leftRings.length);
      ring.position.x = baseX + i * spacing - ringOffset;
    });
    
    rightRings.forEach((ring, i) => {
      const baseX = 0.31;
      const spacing = 0.14;
      const ringOffset = offset * (i / rightRings.length);
      ring.position.x = baseX + i * spacing + ringOffset;
    });
    
    // ?�駷���ӧ���
    this.windowLight.intensity = 0.1 + normalizedPercentage * 0.4;
    
    // ���槵��/?������?����?���㧼??
    this.swayEnabled = normalizedPercentage > 0.2;
  };
  
  windowGroup.setStatus = function(status) {
    this.isOn = (status === 'on');
    
    // �ק����ӧ�����??��
    if (this.isOn) {
      this.curtainLight.intensity = 0.5;
      this.windowLight.intensity = 0.1 + (this.currentOpenPercentage / 100) * 0.4;
      
      // ����?�է�?��?: ��?���ާ�?
      this.skyMaterial.color.set(0x87ceeb);
      this.windowLight.color.set(0xffffee);
      
      // ��������?����?������
      this.leftCurtain.material = this.curtainMaterials.default;
      this.rightCurtain.material = this.curtainMaterials.default;
    } else {
      this.curtainLight.intensity = 0.2;
      this.windowLight.intensity = 0.05;
      
      // ����?�է�?��?: ���ৡ?��?
      this.skyMaterial.color.set(0x0a1a2a);
      this.windowLight.color.set(0x8080a0);
      
      // ����������?��?������
      this.leftCurtain.material = this.curtainMaterials.nightMode;
      this.rightCurtain.material = this.curtainMaterials.nightMode;
    }
  };
  
  // ����?��????��?����
  windowGroup.animate = function(deltaTime) {
    // �ק������??����?��
    this.swayTime += deltaTime || 0.016;
    
    // ���١���槵�������㧼??������??�ק��?�㧢��������?
    if (this.swayEnabled) {
      this.leftCurtain.updateDrape(this.currentOpenPercentage);
      this.rightCurtain.updateDrape(this.currentOpenPercentage);
      
      // ���ҧ�?�㧼???�㧢��?��
      const swayAmount = 0.002 * (this.currentOpenPercentage / 100);
      this.leftRings.forEach((ring, i) => {
        const phase = this.swayTime * 1.5 + i * 0.3;
        ring.position.z = 0.2 + Math.sin(phase) * swayAmount;
      });
      
      this.rightRings.forEach((ring, i) => {
        const phase = this.swayTime * 1.5 + i * 0.3 + Math.PI;
        ring.position.z = 0.2 + Math.sin(phase) * swayAmount;
      });
    }
    
    // ?�㧯�ӡ�ӧ���?����??��?����?��?����??
    if (this.isOn) {
      const skyHue = 0.55 + Math.sin(this.swayTime * 0.2) * 0.02;
      const skySat = 0.7 + Math.sin(this.swayTime * 0.3) * 0.1;
      this.skyMaterial.color.setHSL(skyHue, skySat, 0.7);
    }
  };
  
  // ?�秬???
  windowGroup.setOpenPercentage(100);
  windowGroup.setStatus('on');
  
  return windowGroup;
}

// ???�觹��?��
window.createCurtains = createCurtains;