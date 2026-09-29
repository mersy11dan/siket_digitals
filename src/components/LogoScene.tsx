import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import logoUrl from '../../resource/siket_diditals_logo.png'

const vertexShader = `
  out vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform sampler2D uMap;
  in vec2 vUv;
  out vec4 fragColor;
  void main() {
    vec4 color = texture(uMap, vUv);
    if (vUv.y < 0.36) discard;
    if (color.r < 0.12 && color.g < 0.12 && color.b < 0.12) discard;
    fragColor = color;
  }
`

function Mark({ onReady }: { onReady: () => void }) {
  const texture = useLoader(THREE.TextureLoader, logoUrl)
  const group = useRef<THREE.Group>(null)
  const spin = useRef(0.4)
  const tilt = useRef({ x: 0, y: 0 })

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        toneMapped: false,
        glslVersion: THREE.GLSL3,
        uniforms: { uMap: { value: texture } },
        vertexShader,
        fragmentShader,
      }),
    [texture],
  )

  useLayoutEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
    texture.needsUpdate = true
    material.uniforms.uMap.value = texture
  }, [material, texture])

  useEffect(() => {
    onReady()
    return () => {
      material.dispose()
    }
  }, [material, onReady])

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return
    const onMove = (event: PointerEvent) => {
      tilt.current.x = (event.clientY / window.innerHeight - 0.5) * 0.28
      tilt.current.y = (event.clientX / window.innerWidth - 0.5) * 0.45
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((_, delta) => {
    const node = group.current
    if (!node) return
    spin.current += delta * 0.22
    node.rotation.y = THREE.MathUtils.damp(node.rotation.y, spin.current + tilt.current.y, 3, delta)
    node.rotation.x = THREE.MathUtils.damp(node.rotation.x, tilt.current.x, 3, delta)
  })

  const image = texture.image as { width: number; height: number }
  const aspect = image.width / image.height || 1
  const planeHeight = 2.45
  const planeWidth = planeHeight * aspect

  return (
    <group ref={group} rotation={[0, 0.4, 0]}>
      <mesh material={material}>
        <planeGeometry args={[planeWidth, planeHeight]} />
      </mesh>
    </group>
  )
}

type LogoSceneProps = {
  onReady: () => void
  active: boolean
}

export default function LogoScene({ onReady, active }: LogoSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'demand'}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 4.5], fov: 32 }}
      style={{ width: '100%', height: '100%', touchAction: 'pan-y' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}
    >
      <Suspense fallback={null}>
        <Mark onReady={onReady} />
      </Suspense>
    </Canvas>
  )
}
