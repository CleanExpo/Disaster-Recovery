'use client';

import { useRef } from 'react';
import { Award, Download, Calendar, Shield, Star } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { clientLogger } from '@/lib/observability/client-logger';

interface CertificateProps {
  courseName: string;
  contractorName: string;
  completionDate: string;
  certificateId: string;
  courseHours?: string;
  instructorName?: string;
}

export default function Certificate({
  courseName,
  contractorName,
  completionDate,
  certificateId,
  courseHours = '24',
  instructorName = 'National Restoration Projects'
}: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      // Capture the certificate as canvas
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });

      // Convert to PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`NRP_Certificate_${certificateId}.pdf`);
    } catch (error) {
      clientLogger.error('Error generating certificate:', { source: 'contractor/Certificate' }, error);
    }
  };

  const saveToVisionBoard = () => {
    // Save certificate data to localStorage for vision board
    const certificates = JSON.parse(localStorage.getItem('visionBoardCertificates') || '[]');
    const newCertificate = {
      id: certificateId,
      courseName,
      contractorName,
      completionDate,
      courseHours,
      timestamp: new Date().toISOString()
    };
    
    // Check if certificate already exists
    const exists = certificates.some((cert: any) => cert.id === certificateId);
    if (!exists) {
      certificates.push(newCertificate);
      localStorage.setItem('visionBoardCertificates', JSON.stringify(certificates));
      alert('Certificate added to your Vision Board!');
    } else {
      alert('This certificate is already on your Vision Board.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Certificate Preview */}
      <div 
        ref={certificateRef}
        className="bg-white rounded-lg shadow-2xl p-12 relative overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%),
            radial-gradient(circle at top right, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
            radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.03) 0%, transparent 50%)
          `
        }}
      >
        {/* Decorative borders */}
        <div className="absolute inset-0 border-8 border-double border-indigo-100 rounded-lg pointer-events-none" />
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full">
              <Award className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            Certificate of Completion
          </h1>
          <div className="flex items-center justify-center gap-2 text-indigo-600">
            <Shield className="w-5 h-5" />
            <span className="text-lg font-semibold">National Restoration Projects</span>
            <Shield className="w-5 h-5" />
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-6 mb-8">
          <p className="text-gray-700 text-lg">This is to certify that</p>
          
          <h2 className="text-3xl font-bold text-gray-900 py-2 border-b-2 border-indigo-200 inline-block px-8">
            {contractorName || 'Contractor Name'}
          </h2>
          
          <p className="text-gray-700 text-lg">has successfully completed the</p>
          
          <h3 className="text-2xl font-bold text-indigo-800">
            {courseName}
          </h3>
          
          <div className="flex items-center justify-center gap-8 text-gray-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              <span>Completed: {completionDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-indigo-500" />
              <span>{courseHours} Hours</span>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 mt-12">
          <div className="text-center">
            <div className="border-t-2 border-gray-400 mb-2" />
            <p className="text-sm text-gray-700">{instructorName}</p>
            <p className="text-xs text-gray-700">Training Director</p>
          </div>
          <div className="text-center">
            <div className="border-t-2 border-gray-400 mb-2" />
            <p className="text-sm text-gray-700">Certificate ID: {certificateId}</p>
            <p className="text-xs text-gray-700">Verification Code</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4">
          <div className="w-20 h-20 border-4 border-indigo-200 rounded-full opacity-20" />
        </div>
        <div className="absolute top-4 right-4">
          <div className="w-20 h-20 border-4 border-purple-200 rounded-full opacity-20" />
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="w-20 h-20 border-4 border-purple-200 rounded-full opacity-20" />
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="w-20 h-20 border-4 border-indigo-200 rounded-full opacity-20" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center mt-8">
        <button
          onClick={downloadCertificate}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          Download Certificate
        </button>
        <button
          onClick={saveToVisionBoard}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Award className="w-5 h-5" />
          Add to Vision Board
        </button>
      </div>
    </div>
  );
}