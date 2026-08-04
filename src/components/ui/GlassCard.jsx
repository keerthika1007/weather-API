import { motion } from 'motion/react'

export function GlassCard({ as: Component = 'section', className = '', children, interactive = false, ...props }) {
  const Card = interactive ? motion[Component] ?? motion.section : Component
  const motionProps = interactive
    ? { whileHover: { y: -4 }, transition: { duration: 0.22, ease: 'easeOut' } }
    : {}

  return (
    <Card className={`glass-card ${className}`} {...motionProps} {...props}>
      {children}
    </Card>
  )
}
