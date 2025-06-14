import PageBreadcrumb from '@/components/ui/PageBreadcrumb';
import Container from '@/components/ui/Container';
import React from 'react';

export default function RespondentResultsPage() {
  return (
    <Container className="py-6">
      <PageBreadcrumb items={[{ label: "Hasil Responden" }]} />
      <h1 className="text-2xl font-bold mb-6">Hasil Responden</h1>
    </Container>
  );
}
