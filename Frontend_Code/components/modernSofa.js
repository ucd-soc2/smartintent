// modernSofa.js - �ִ����ɳ�����
// Ϊ���� Three.js ���ܼҾӳ�����Ƶĸ��ִ�ɳ��

function createModernSofa() {
  const sofaGroup = new THREE.Group();

  // ��ɫ����
  const colors = {
    mainBody: 0x37474f,       // ������ɫ����
    cushions: 0x78909c,       // ǳ����ɫ����
    accent: 0xeceff1,         // �׻�ɫװ��Ԫ��
    metal: 0xb0bec5,          // ��������
    legs: 0x212121            // ��ɫ��
  };

  // ɳ������ - ƽ���Ļ��ε���
  const baseGeometry = new THREE.BoxGeometry(2.4, 0.15, 1.2);
  const baseMaterial = new THREE.MeshStandardMaterial({ 
    color: colors.mainBody, 
    roughness: 0.3,
    metalness: 0.1
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = 0.15;
  sofaGroup.add(base);

  // ����ɳ���ײ��Ļ�������
  const baseEdgeGeometry = new THREE.BoxGeometry(2.4, 0.07, 1.25);
  const baseEdge = new THREE.Mesh(baseEdgeGeometry, baseMaterial);
  baseEdge.position.set(0, 0.05, 0);
  baseEdge.scale.set(0.98, 1, 1.02);
  sofaGroup.add(baseEdge);

  // ɳ��������� - ����ϸ�����
  const backFrameGeometry = new THREE.BoxGeometry(2.4, 0.9, 0.2);
  const backFrameMaterial = new THREE.MeshStandardMaterial({ 
    color: colors.mainBody, 
    roughness: 0.5 
  });
  const backFrame = new THREE.Mesh(backFrameGeometry, backFrameMaterial);
  backFrame.position.set(0, 0.6, -0.5);
  backFrame.castShadow = true;
  sofaGroup.add(backFrame);

  // ��������ϸ�ĵ��棬��΢���ڻ���
  const backBottomGeometry = new THREE.BoxGeometry(2.35, 0.2, 0.15);
  const backBottom = new THREE.Mesh(backBottomGeometry, backFrameMaterial);
  backBottom.position.set(0, 0.2, -0.48);
  sofaGroup.add(backBottom);

  // ɳ�������� - �ֳ����������ĵ��ӣ��������ʺ���ʵ
  const createSeatCushion = (x) => {
    const cushionGroup = new THREE.Group();
    
    // ��������״
    const cushionGeometry = new THREE.BoxGeometry(0.75, 0.18, 0.9);
    const cushionMaterial = new THREE.MeshStandardMaterial({ 
      color: colors.cushions, 
      roughness: 0.7 
    });
    const cushion = new THREE.Mesh(cushionGeometry, cushionMaterial);
    cushion.castShadow = true;
    cushionGroup.add(cushion);
    
    // ����ǰ��Ե��΢¡��
    const frontEdgeGeometry = new THREE.BoxGeometry(0.75, 0.05, 0.1);
    const frontEdge = new THREE.Mesh(frontEdgeGeometry, cushionMaterial);
    frontEdge.position.set(0, -0.05, 0.4);
    cushionGroup.add(frontEdge);
    
    // ���װ����
    const lineGeometry = new THREE.BoxGeometry(0.73, 0.01, 0.88);
    const lineMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2c3e50, 
      roughness: 0.5 
    });
    const decorLine = new THREE.Mesh(lineGeometry, lineMaterial);
    decorLine.position.set(0, 0.09, 0);
    cushionGroup.add(decorLine);
    
    // ��Ӱ���Ч��
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        const buttonGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.01, 12);
        const buttonMaterial = new THREE.MeshStandardMaterial({ 
          color: colors.mainBody, 
          roughness: 0.3 
        });
        const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
        button.rotation.x = Math.PI / 2;
        button.position.set(-0.25 + i * 0.25, 0.1, -0.2 + j * 0.4);
        cushionGroup.add(button);
      }
    }
    
    cushionGroup.position.set(x, 0.35, 0.05);
    return cushionGroup;
  };

  // �����������
  sofaGroup.add(createSeatCushion(-0.78));
  sofaGroup.add(createSeatCushion(0));
  sofaGroup.add(createSeatCushion(0.78));

  // ������ - ���������ĵ���
  const createBackCushion = (x) => {
    const cushionGroup = new THREE.Group();
    
    // ��������
    const cushionGeometry = new THREE.BoxGeometry(0.75, 0.6, 0.15);
    const cushionMaterial = new THREE.MeshStandardMaterial({ 
      color: colors.cushions, 
      roughness: 0.7 
    });
    const cushion = new THREE.Mesh(cushionGeometry, cushionMaterial);
    cushion.castShadow = true;
    cushionGroup.add(cushion);
    
    // ���װ����
    const hLineGeometry = new THREE.BoxGeometry(0.73, 0.01, 0.13);
    const lineGeometry = new THREE.BoxGeometry(0.73, 0.58, 0.01);
    const lineMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2c3e50, 
      roughness: 0.5 
    });
    
    const decorLine1 = new THREE.Mesh(hLineGeometry, lineMaterial);
    decorLine1.position.set(0, 0.2, 0);
    cushionGroup.add(decorLine1);
    
    const decorLine2 = new THREE.Mesh(hLineGeometry, lineMaterial);
    decorLine2.position.set(0, -0.2, 0);
    cushionGroup.add(decorLine2);
    
    const decorLine3 = new THREE.Mesh(lineGeometry, lineMaterial);
    decorLine3.position.set(0, 0, 0.07);
    cushionGroup.add(decorLine3);
    
    // ����Ч��
    for (let i = 0; i < 3; i++) {
      const buttonGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.01, 12);
      const buttonMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.mainBody, 
        roughness: 0.3 
      });
      const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
      button.rotation.z = Math.PI / 2;
      button.position.set(0, -0.2 + i * 0.2, 0.08);
      cushionGroup.add(button);
    }
    
    cushionGroup.position.set(x, 0.8, -0.4);
    return cushionGroup;
  };

  // �������������
  sofaGroup.add(createBackCushion(-0.78));
  sofaGroup.add(createBackCushion(0));
  sofaGroup.add(createBackCushion(0.78));

  // װ���Է��ֵ�
  const createArmrest = (x) => {
    const armGroup = new THREE.Group();
    
    // ��������
    const armGeometry = new THREE.BoxGeometry(0.2, 0.4, 1);
    const armMaterial = new THREE.MeshStandardMaterial({ 
      color: colors.mainBody, 
      roughness: 0.5 
    });
    const arm = new THREE.Mesh(armGeometry, armMaterial);
    arm.position.set(0, 0.2, 0);
    arm.castShadow = true;
    armGroup.add(arm);
    
    // ���ֵ�
    const padGeometry = new THREE.BoxGeometry(0.25, 0.05, 0.7);
    const padMaterial = new THREE.MeshStandardMaterial({ 
      color: colors.cushions, 
      roughness: 0.7 
    });
    const pad = new THREE.Mesh(padGeometry, padMaterial);
    pad.position.set(0, 0.43, 0);
    armGroup.add(pad);
    
    // װ����
    const trimGeometry = new THREE.BoxGeometry(0.22, 0.02, 0.72);
    const trimMaterial = new THREE.MeshStandardMaterial({ 
      color: colors.metal, 
      metalness: 0.7, 
      roughness: 0.3 
    });
    const trim = new THREE.Mesh(trimGeometry, trimMaterial);
    trim.position.set(0, 0.4, 0);
    armGroup.add(trim);
    
    armGroup.position.set(x, 0.3, 0);
    return armGroup;
  };

  // ��ӷ���
  sofaGroup.add(createArmrest(-1.3));
  sofaGroup.add(createArmrest(1.3));

  // �ִ�����ɳ����
  const createLeg = (x, z) => {
    const legGroup = new THREE.Group();
    
    // �������
    const frameGeometry = new THREE.BoxGeometry(0.05, 0.15, 0.05);
    const frameMaterial = new THREE.MeshStandardMaterial({ 
      color: colors.metal, 
      metalness: 0.8, 
      roughness: 0.2 
    });
    const legFrame = new THREE.Mesh(frameGeometry, frameMaterial);
    legFrame.position.set(0, -0.08, 0);
    legGroup.add(legFrame);
    
    // �ײ���Ƭ
    const padGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.01, 16);
    const padMaterial = new THREE.MeshStandardMaterial({ 
      color: colors.legs, 
      roughness: 0.8 
    });
    const pad = new THREE.Mesh(padGeometry, padMaterial);
    pad.position.set(0, -0.16, 0);
    legGroup.add(pad);
    
    legGroup.position.set(x, 0, z);
    return legGroup;
  };

  // ���������
  sofaGroup.add(createLeg(-1.1, 0.4));
  sofaGroup.add(createLeg(1.1, 0.4));
  sofaGroup.add(createLeg(-1.1, -0.4));
  sofaGroup.add(createLeg(1.1, -0.4));

  // ���װ���Եı���
  const createPillow = (x, z, color, rotation) => {
    const pillowGroup = new THREE.Group();
    
    // ��������
    const pillowGeometry = new THREE.BoxGeometry(0.35, 0.35, 0.08);
    const pillowMaterial = new THREE.MeshStandardMaterial({ 
      color: color, 
      roughness: 0.9 
    });
    const pillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
    pillow.castShadow = true;
    pillowGroup.add(pillow);
    
    // ����߿�
    const borderGeometry = new THREE.BoxGeometry(0.37, 0.37, 0.01);
    const borderMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2c3e50, 
      roughness: 0.8 
    });
    const border = new THREE.Mesh(borderGeometry, borderMaterial);
    border.position.set(0, 0, 0.05);
    pillowGroup.add(border);
    
    pillowGroup.position.set(x, 0.55, z);
    if (rotation) {
      pillowGroup.rotation.z = rotation;
      pillowGroup.rotation.x = -0.3;
    }
    
    return pillowGroup;
  };

  // ���װ�α���
  sofaGroup.add(createPillow(-0.7, -0.25, 0xeceff1, 0.3));
  sofaGroup.add(createPillow(0.8, -0.25, 0x90caf9, -0.2));

  // �����Ż�
  sofaGroup.traverse(child => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return sofaGroup;
}

// ��������ӵ�ȫ��������
window.createModernSofa = createModernSofa;