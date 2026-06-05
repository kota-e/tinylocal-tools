import { useState } from 'react';
import { Layout } from '../components/Layout';
import { useI18n } from '../i18n/useI18n';
import { MarkdownTableFixer } from '../tools/markdown-table-fixer/MarkdownTableFixer';
import { PasteFix } from '../tools/pastefix/PasteFixTool';
import { SafePaste } from '../tools/safepaste/SafePasteTool';

type TabId = 'pastefix' | 'safepaste' | 'tablefixer';

export function App() {
  const { language, setLanguage, t } = useI18n();
  const [activeTab, setActiveTab] = useState<TabId>('pastefix');
  const tabs: { id: TabId; label: string }[] = [
    { id: 'pastefix', label: t.pastefix },
    { id: 'safepaste', label: t.safepaste },
    { id: 'tablefixer', label: t.tablefixer },
  ];

  return (
    <Layout
      appName={t.appName}
      tagline={t.tagline}
      privacy={t.privacy}
      language={language}
      onLanguageChange={setLanguage}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as TabId)}
    >
      <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
        {activeTab === 'pastefix' ? <PasteFix t={t} /> : null}
        {activeTab === 'safepaste' ? <SafePaste t={t} /> : null}
        {activeTab === 'tablefixer' ? <MarkdownTableFixer t={t} /> : null}
      </div>
    </Layout>
  );
}
