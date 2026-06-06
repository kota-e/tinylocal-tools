import { useState } from 'react';
import { Layout } from '../components/Layout';
import { useI18n } from '../i18n/useI18n';
import { MarkdownTableFixer } from '../tools/markdown-table-fixer/MarkdownTableFixer';
import { PasteFix } from '../tools/pastefix/PasteFixTool';
import { SafePaste } from '../tools/safepaste/SafePasteTool';

type TabId = 'pastefix' | 'safepaste' | 'tablefixer';

const tabIds: TabId[] = ['pastefix', 'safepaste', 'tablefixer'];

function readInitialTab(): TabId {
  if (typeof window === 'undefined') {
    return 'pastefix';
  }

  const requestedTool = new URLSearchParams(window.location.search).get('tool');
  return tabIds.find((tabId) => tabId === requestedTool) ?? 'pastefix';
}

export function App() {
  const { language, setLanguage, t } = useI18n();
  const [activeTab, setActiveTab] = useState<TabId>(readInitialTab);
  const tabs: { id: TabId; label: string }[] = [
    { id: 'pastefix', label: t.pastefix },
    { id: 'safepaste', label: t.safepaste },
    { id: 'tablefixer', label: t.tablefixer },
  ];
  const toolSummaries = [
    { id: 'pastefix', name: t.pastefix, summary: t.pastefixSummary },
    { id: 'safepaste', name: t.safepaste, summary: t.safepasteSummary },
    { id: 'tablefixer', name: t.tablefixer, summary: t.tablefixerSummary },
  ];

  return (
    <Layout
      appName={t.appName}
      tagline={t.tagline}
      intro={t.intro}
      privacy={t.privacy}
      privacyTitle={t.privacyTitle}
      privacyItems={[t.privacyBrowser, t.privacyNoUpload, t.privacyNoTracking]}
      toolSummaryLabel={t.toolSummaryLabel}
      toolSummaries={toolSummaries}
      language={language}
      onLanguageChange={setLanguage}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => {
        const nextTab = id as TabId;
        setActiveTab(nextTab);
        window.history.replaceState(null, '', `?tool=${nextTab}`);
      }}
    >
      <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
        {activeTab === 'pastefix' ? <PasteFix t={t} /> : null}
        {activeTab === 'safepaste' ? <SafePaste t={t} /> : null}
        {activeTab === 'tablefixer' ? <MarkdownTableFixer t={t} /> : null}
      </div>
    </Layout>
  );
}
