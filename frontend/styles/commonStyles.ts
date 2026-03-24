import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },

  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827',
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 10,
    color: '#111827',
  },

  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#ffffff',
  },

  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6b7280',
    fontSize: 15,
  },

  imagePlaceholder: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
  },

  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#111827',
  },
});