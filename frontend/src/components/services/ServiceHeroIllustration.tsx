import React from "react";
import { motion } from "framer-motion";
import type { HeroVariant } from "../../constants/serviceNav";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Brain,
  Code2,
  Database,
  Server,
  Layers,
  Cloud,
  Smartphone,
  Globe,
  Search,
  PenTool,
  Briefcase,
  HeartPulse,
  Workflow,
  Users,
  Building2,
  ShoppingCart,
  Layout,
  Zap,
  BarChart3,
  Shield,
} from "lucide-react";

interface ServiceHeroIllustrationProps {
  variant: HeroVariant;
}

interface FloatingNode {
  icon: LucideIcon;
  x: string;
  y: string;
  delay: number;
  size?: number;
}

const variantConfig: Record<
  HeroVariant,
  { primary: string; secondary: string; accent: string; nodes: FloatingNode[] }
> = {
  ai: {
    primary: "rgba(49,185,143,0.35)",
    secondary: "rgba(104,75,158,0.3)",
    accent: "rgba(0,191,222,0.25)",
    nodes: [
      { icon: Bot, x: "15%", y: "20%", delay: 0 },
      { icon: Brain, x: "70%", y: "15%", delay: 0.5 },
      { icon: Zap, x: "75%", y: "65%", delay: 1 },
      { icon: BarChart3, x: "20%", y: "70%", delay: 1.5 },
    ],
  },
  code: {
    primary: "rgba(49,185,143,0.3)",
    secondary: "rgba(0,191,222,0.25)",
    accent: "rgba(104,75,158,0.2)",
    nodes: [
      { icon: Code2, x: "18%", y: "25%", delay: 0 },
      { icon: Layers, x: "68%", y: "18%", delay: 0.4 },
      { icon: Server, x: "72%", y: "68%", delay: 0.8 },
      { icon: Database, x: "22%", y: "72%", delay: 1.2 },
    ],
  },
  mern: {
    primary: "rgba(49,185,143,0.32)",
    secondary: "rgba(104,75,158,0.28)",
    accent: "rgba(0,191,222,0.22)",
    nodes: [
      { icon: Database, x: "20%", y: "22%", delay: 0 },
      { icon: Server, x: "65%", y: "20%", delay: 0.3 },
      { icon: Code2, x: "70%", y: "65%", delay: 0.6 },
      { icon: Layers, x: "18%", y: "68%", delay: 0.9 },
    ],
  },
  fullstack: {
    primary: "rgba(104,75,158,0.32)",
    secondary: "rgba(49,185,143,0.28)",
    accent: "rgba(0,191,222,0.22)",
    nodes: [
      { icon: Layers, x: "50%", y: "12%", delay: 0, size: 28 },
      { icon: Code2, x: "15%", y: "50%", delay: 0.4 },
      { icon: Server, x: "78%", y: "45%", delay: 0.8 },
      { icon: Database, x: "50%", y: "78%", delay: 1.2 },
    ],
  },
  saas: {
    primary: "rgba(0,191,222,0.3)",
    secondary: "rgba(49,185,143,0.28)",
    accent: "rgba(104,75,158,0.22)",
    nodes: [
      { icon: Cloud, x: "50%", y: "18%", delay: 0, size: 32 },
      { icon: BarChart3, x: "18%", y: "55%", delay: 0.5 },
      { icon: Users, x: "75%", y: "50%", delay: 1 },
      { icon: Zap, x: "50%", y: "75%", delay: 1.5 },
    ],
  },
  mobile: {
    primary: "rgba(49,185,143,0.3)",
    secondary: "rgba(104,75,158,0.25)",
    accent: "rgba(0,191,222,0.28)",
    nodes: [
      { icon: Smartphone, x: "50%", y: "50%", delay: 0, size: 48 },
      { icon: Zap, x: "20%", y: "25%", delay: 0.6 },
      { icon: Shield, x: "75%", y: "30%", delay: 1.2 },
      { icon: BarChart3, x: "25%", y: "72%", delay: 1.8 },
    ],
  },
  webapp: {
    primary: "rgba(49,185,143,0.28)",
    secondary: "rgba(0,191,222,0.26)",
    accent: "rgba(104,75,158,0.2)",
    nodes: [
      { icon: Globe, x: "50%", y: "45%", delay: 0, size: 40 },
      { icon: Code2, x: "18%", y: "22%", delay: 0.5 },
      { icon: Server, x: "78%", y: "25%", delay: 1 },
      { icon: Database, x: "22%", y: "72%", delay: 1.5 },
    ],
  },
  seo: {
    primary: "rgba(0,191,222,0.3)",
    secondary: "rgba(49,185,143,0.25)",
    accent: "rgba(104,75,158,0.2)",
    nodes: [
      { icon: Search, x: "50%", y: "40%", delay: 0, size: 44 },
      { icon: BarChart3, x: "20%", y: "22%", delay: 0.5 },
      { icon: Globe, x: "75%", y: "65%", delay: 1 },
      { icon: Zap, x: "18%", y: "68%", delay: 1.5 },
    ],
  },
  design: {
    primary: "rgba(104,75,158,0.32)",
    secondary: "rgba(0,191,222,0.25)",
    accent: "rgba(49,185,143,0.2)",
    nodes: [
      { icon: PenTool, x: "50%", y: "42%", delay: 0, size: 42 },
      { icon: Layers, x: "20%", y: "20%", delay: 0.5 },
      { icon: Zap, x: "75%", y: "22%", delay: 1 },
      { icon: Briefcase, x: "22%", y: "72%", delay: 1.5 },
    ],
  },
  portfolio: {
    primary: "rgba(49,185,143,0.28)",
    secondary: "rgba(104,75,158,0.26)",
    accent: "rgba(0,191,222,0.22)",
    nodes: [
      { icon: Briefcase, x: "50%", y: "42%", delay: 0, size: 40 },
      { icon: PenTool, x: "18%", y: "22%", delay: 0.5 },
      { icon: Globe, x: "75%", y: "28%", delay: 1 },
      { icon: Zap, x: "22%", y: "70%", delay: 1.5 },
    ],
  },
  healthcare: {
    primary: "rgba(49,185,143,0.3)",
    secondary: "rgba(0,191,222,0.25)",
    accent: "rgba(104,75,158,0.2)",
    nodes: [
      { icon: HeartPulse, x: "50%", y: "42%", delay: 0, size: 44 },
      { icon: Shield, x: "20%", y: "22%", delay: 0.5 },
      { icon: Database, x: "75%", y: "25%", delay: 1 },
      { icon: Users, x: "22%", y: "72%", delay: 1.5 },
    ],
  },
  automation: {
    primary: "rgba(0,191,222,0.28)",
    secondary: "rgba(49,185,143,0.28)",
    accent: "rgba(104,75,158,0.22)",
    nodes: [
      { icon: Workflow, x: "50%", y: "40%", delay: 0, size: 42 },
      { icon: Zap, x: "18%", y: "22%", delay: 0.5 },
      { icon: Bot, x: "75%", y: "28%", delay: 1 },
      { icon: BarChart3, x: "22%", y: "70%", delay: 1.5 },
    ],
  },
  crm: {
    primary: "rgba(49,185,143,0.28)",
    secondary: "rgba(104,75,158,0.28)",
    accent: "rgba(0,191,222,0.22)",
    nodes: [
      { icon: Users, x: "50%", y: "42%", delay: 0, size: 42 },
      { icon: BarChart3, x: "18%", y: "22%", delay: 0.5 },
      { icon: Zap, x: "75%", y: "28%", delay: 1 },
      { icon: Workflow, x: "22%", y: "70%", delay: 1.5 },
    ],
  },
  erp: {
    primary: "rgba(104,75,158,0.32)",
    secondary: "rgba(49,185,143,0.25)",
    accent: "rgba(0,191,222,0.2)",
    nodes: [
      { icon: Building2, x: "50%", y: "42%", delay: 0, size: 44 },
      { icon: Database, x: "18%", y: "22%", delay: 0.5 },
      { icon: Layers, x: "75%", y: "28%", delay: 1 },
      { icon: BarChart3, x: "22%", y: "70%", delay: 1.5 },
    ],
  },
  ecommerce: {
    primary: "rgba(49,185,143,0.3)",
    secondary: "rgba(0,191,222,0.26)",
    accent: "rgba(104,75,158,0.2)",
    nodes: [
      { icon: ShoppingCart, x: "50%", y: "42%", delay: 0, size: 44 },
      { icon: BarChart3, x: "18%", y: "22%", delay: 0.5 },
      { icon: Globe, x: "75%", y: "28%", delay: 1 },
      { icon: Zap, x: "22%", y: "70%", delay: 1.5 },
    ],
  },
  wordpress: {
    primary: "rgba(0,191,222,0.28)",
    secondary: "rgba(49,185,143,0.26)",
    accent: "rgba(104,75,158,0.22)",
    nodes: [
      { icon: Layout, x: "50%", y: "42%", delay: 0, size: 44 },
      { icon: Code2, x: "18%", y: "22%", delay: 0.5 },
      { icon: Globe, x: "75%", y: "28%", delay: 1 },
      { icon: Search, x: "22%", y: "70%", delay: 1.5 },
    ],
  },
};

const ServiceHeroIllustration: React.FC<ServiceHeroIllustrationProps> = ({ variant }) => {
  const config = variantConfig[variant];

  return (
    <div
      className="relative w-full aspect-square max-w-[480px] mx-auto lg:mx-0"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <motion.div
        className="absolute inset-4 rounded-[2.5rem]"
        style={{
          border: "1px solid var(--color-glass-border)",
          background: "var(--color-glass)",
          backdropFilter: "blur(24px)",
        }}
        animate={{ rotate: [0, 1, 0, -1, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Gradient orbs */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "55%",
          height: "55%",
          top: "5%",
          left: "5%",
          background: `radial-gradient(circle, ${config.primary}, transparent 70%)`,
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "50%",
          height: "50%",
          bottom: "5%",
          right: "5%",
          background: `radial-gradient(circle, ${config.secondary}, transparent 70%)`,
          filter: "blur(40px)",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "35%",
          height: "35%",
          top: "35%",
          left: "35%",
          background: `radial-gradient(circle, ${config.accent}, transparent 70%)`,
          filter: "blur(30px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Center hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            boxShadow: "0 20px 60px rgba(49,185,143,0.25)",
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {(() => {
            const CenterIcon = config.nodes[0]?.icon ?? Bot;
            return <CenterIcon size={40} color="white" />;
          })()}
        </motion.div>
      </div>

      {/* Floating satellite nodes */}
      {config.nodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={i}
            className="absolute w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              left: node.x,
              top: node.y,
              transform: "translate(-50%, -50%)",
              background: "var(--color-glass)",
              border: "1px solid var(--color-glass-border)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay,
            }}
          >
            <Icon size={node.size ?? 22} style={{ color: "var(--color-primary)" }} />
          </motion.div>
        );
      })}

      {/* Connection lines (decorative) */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <circle
          cx="50%"
          cy="50%"
          r="38%"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="1"
          strokeDasharray="6 8"
        />
      </svg>
    </div>
  );
};

export default ServiceHeroIllustration;
