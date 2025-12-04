// Tabs.jsx
import { motion } from "framer-motion";
import Button from "./Button";

export default function Tabs({ tabs = [], activeTab, onChange, padding = "px-8 py-2", fontSize = "text-md" }) {
    return (
        <div className={`${fontSize} mb-12 mt-4 flex gap-2 p-0.5 bg-white border border-accent-light/20 rounded-3xl w-fit shadow-md`}>
            {tabs.map((tab) => (
                <div key={tab.id} className="relative">
                    <Button
                        className={`${padding} !rounded-3xl !my-0 !border-none relative z-10 ${activeTab === tab.id && "text-white"}`}
                        onClick={() => onChange(tab.id)}
                    >
                        {tab.label}
                    </Button>

                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="tabsHighlight"
                            className="absolute inset-0 bg-gradient-red rounded-3xl"
                            transition={{ type: "spring", duration: 0.5 }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
