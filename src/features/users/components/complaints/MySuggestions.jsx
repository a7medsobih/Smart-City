import { motion } from "framer-motion";
import SuggestionCard from "./SuggestionCard";
import { useAllSuggestions } from "../../hooks/useAllSuggestions";
import GlobalPreloader from "../../../../components/GlobalPreloader";
import EmptyList from "./EmptyList";

function MySuggestions() {
  const { suggestions, isLoading } = useAllSuggestions();
  if (isLoading) return <GlobalPreloader />;

  if (suggestions.length === 0) return <EmptyList msg="suggestions" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-4 rounded-xl bg-white p-8 border border-primary-light/50 shadow-md">
        {suggestions.map((item) => (
          <SuggestionCard item={item} key={item?.id} />
        ))}
      </div>
    </motion.div>
  );
}

export default MySuggestions;
